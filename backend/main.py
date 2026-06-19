from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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
