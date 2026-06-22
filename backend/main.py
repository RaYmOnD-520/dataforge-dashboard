from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "message": "DataForge Dashboard API"}

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV")

    try:
        contents = await file.read()

        if not contents:
            raise HTTPException(status_code=400, detail="File is empty")

        df = pd.read_csv(io.BytesIO(contents))

        if df.empty:
            raise HTTPException(status_code=400, detail="CSV file contains no data")

        numeric_columns = df.select_dtypes(include=['number']).columns.tolist()

        summary_stats = {}
        for col in numeric_columns:
            summary_stats[col] = {
                "min": float(df[col].min()) if pd.notna(df[col].min()) else None,
                "max": float(df[col].max()) if pd.notna(df[col].max()) else None,
                "mean": float(df[col].mean()) if pd.notna(df[col].mean()) else None,
                "null_count": int(df[col].isna().sum())
            }

        preview_df = df.head(10).replace({np.nan: None, np.inf: None, -np.inf: None})
        preview = preview_df.to_dict(orient='records')

        return {
            "filename": file.filename,
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": df.columns.tolist(),
            "numeric_columns": numeric_columns,
            "preview": preview,
            "summary_stats": summary_stats
        }

    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="CSV file is empty or malformed")
    except pd.errors.ParserError as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

class QualityRequest(BaseModel):
    filename: str
    row_count: int
    column_count: int
    columns: List[str]
    numeric_columns: List[str]
    summary_stats: Dict[str, Any]
    preview: List[Dict[str, Any]]

@app.post("/quality")
async def analyze_quality(request: QualityRequest):
    try:
        columns_info = []
        total_null_count = 0
        total_cells = request.row_count * request.column_count
        outlier_count = 0

        # Estimate duplicate rows from preview
        preview_df = pd.DataFrame(request.preview)
        duplicate_rows = 0
        if len(preview_df) > 0:
            duplicates_in_preview = int(preview_df.duplicated().sum())
            # Estimate total duplicates proportionally
            if len(preview_df) > 0:
                duplicate_rows = int((duplicates_in_preview / len(preview_df)) * request.row_count)

        # Analyze each column
        for col in request.columns:
            is_numeric = col in request.numeric_columns

            # Get null count from summary_stats or calculate from preview
            if is_numeric and col in request.summary_stats:
                null_count = int(request.summary_stats[col].get('null_count', 0))
            else:
                # For text columns, estimate from preview
                null_count_preview = int(preview_df[col].isna().sum()) if col in preview_df.columns else 0
                null_count = int((null_count_preview / len(preview_df)) * request.row_count) if len(preview_df) > 0 else 0

            total_null_count += null_count
            null_percent = float(round((null_count / request.row_count * 100), 1)) if request.row_count > 0 else 0.0

            # Determine status
            if null_percent < 5:
                status = "good"
            elif null_percent <= 20:
                status = "warning"
            else:
                status = "critical"

            # Check for outliers (numeric columns only)
            has_outliers = False
            if is_numeric and col in request.summary_stats:
                stats = request.summary_stats[col]
                mean = stats.get('mean')
                max_val = stats.get('max')

                # Calculate standard deviation from preview
                if col in preview_df.columns and len(preview_df[col].dropna()) > 0:
                    std = float(preview_df[col].std())
                    if mean is not None and max_val is not None and std is not None and std > 0:
                        has_outliers = bool(max_val > (mean + 3 * std))
                        if has_outliers:
                            outlier_count += 1

            col_info = {
                "name": str(col),
                "dtype": "numeric" if is_numeric else "text",
                "null_count": int(null_count),
                "null_percent": float(null_percent),
                "status": str(status)
            }

            if is_numeric:
                col_info["has_outliers"] = bool(has_outliers)

            columns_info.append(col_info)

        # Calculate overall score
        total_null_percent = float((total_null_count / total_cells * 100)) if total_cells > 0 else 0.0
        outlier_penalty = int(outlier_count * 5)  # 5 points penalty per column with outliers
        overall_score = int(max(0, min(100, 100 - total_null_percent - outlier_penalty)))

        total_issues = int(sum(1 for col in columns_info if col['status'] in ['warning', 'critical']))

        return {
            "overall_score": int(overall_score),
            "total_rows": int(request.row_count),
            "duplicate_rows": int(duplicate_rows),
            "total_issues": int(total_issues),
            "columns": columns_info
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing data quality: {str(e)}")
