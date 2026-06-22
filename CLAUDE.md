# DataForge Dashboard - Developer Documentation

This document provides technical context for working with the DataForge Dashboard codebase.

## Project Overview

DataForge Dashboard is a full-stack data analytics application that allows users to upload CSV files, explore their data through interactive visualizations, and receive automated quality analysis reports. The application is built with a React frontend and a FastAPI backend, designed with a modern emerald/teal color scheme.

## Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Vite as the build tool
- **Styling**: Tailwind CSS v4 with extensive inline styles for complex UI components
- **State Management**: React hooks (useState) for local component state
- **HTTP Client**: Axios for API communication
- **Port**: `http://localhost:5173`

### Backend (FastAPI + pandas)
- **Framework**: FastAPI (Python async web framework)
- **Data Processing**: pandas for CSV parsing and statistical analysis
- **CORS**: Configured to accept requests from the frontend origin
- **Port**: `http://localhost:8000`

### Communication Flow
1. User uploads CSV via frontend FileUpload component
2. Frontend sends FormData to `POST /upload` endpoint
3. Backend processes CSV with pandas, returns JSON with preview and stats
4. Frontend displays data in DataTable, StatsPanel, and charts
5. Frontend automatically calls `POST /quality` with the uploaded data
6. Backend analyzes quality metrics and returns health scores
7. QualityReport component displays the analysis

## Key Files and Components

### Frontend (`/frontend/src`)

#### `App.jsx`
Main application component that orchestrates all sections:
- Manages uploadedData state
- Renders navbar, upload section, stats panels, charts, and quality report
- Controls active chart selection (bar/line/pie)

#### Components (`/frontend/src/components/`)

**FileUpload.jsx**
- Handles drag-and-drop and file input for CSV uploads
- Sends files to `/upload` endpoint via axios
- Shows upload progress and success/error states

**DataTable.jsx**
- Renders a scrollable table with the data preview
- Styled with matching design system colors

**StatsPanel.jsx**
- Displays column statistics cards for numeric columns
- Shows min, max, mean, std with sparkline mini-charts

**BarChart.jsx**
- Vertical bar chart with column selector
- Uses custom SVG rendering with animations

**LineChart.jsx**
- Line chart with custom SVG path generation
- Includes gradient fills and smooth animations

**PieChart.jsx**
- Donut chart with custom arc rendering
- Matches Claude Design mockup specifications
- Center total display with legend on the right

**QualityReport.jsx**
- Automatically fetches quality analysis from `/quality` endpoint
- Displays health score (0-100%), duplicate rows, and total issues
- Column-level quality cards with null percentages, status badges, and outlier warnings

### Backend (`/backend`)

#### `main.py`
FastAPI application with two main endpoints:

**`POST /upload`**
- Accepts CSV file upload
- Parses with pandas
- Calculates summary statistics for numeric columns
- Returns JSON with:
  - filename, row_count, column_count
  - columns list and numeric_columns list
  - preview (first 10 rows)
  - summary_stats (min, max, mean, null_count per numeric column)

**`POST /quality`**
- Accepts JSON body with uploaded data metadata
- Analyzes data quality using pandas
- Returns JSON with:
  - overall_score (0-100 health percentage)
  - total_rows, duplicate_rows, total_issues
  - columns array with per-column analysis:
    - name, dtype, null_count, null_percent
    - status: "good" (<5% nulls), "warning" (5-20%), "critical" (>20%)
    - has_outliers: boolean (max > mean + 3×std for numeric columns)

**Important**: All numpy types are explicitly converted to native Python types (int(), float(), bool()) to avoid JSON serialization errors.

## API Endpoints

### `GET /`
Health check endpoint - returns `{"status": "ok", "message": "DataForge Dashboard API"}`

### `POST /upload`
**Request**: `multipart/form-data` with CSV file  
**Response**: JSON with parsed data and statistics  
**Error Codes**: 400 (bad file), 500 (processing error)

### `POST /quality`
**Request**: JSON body with QualityRequest schema  
**Response**: JSON with quality analysis  
**Error Codes**: 500 (analysis error)

## Design System

### Colors
- **Primary Green**: `#34e0a1` (emerald)
- **Secondary Cyan**: `#22b8cf`
- **Teal**: `#2dd4bf`
- **Accent Green**: `#4ade80`
- **Light Cyan**: `#5eead4`
- **Soft Green**: `#86efac`
- **Amber/Warning**: `#f59e0b`, `#f59e42`
- **Red/Critical**: `#ef4444`

### Typography
- **Headings**: `'Space Grotesk', sans-serif` (font-heading)
- **Body**: `'Inter', sans-serif`
- **Code/Data**: `'JetBrains Mono', monospace` (font-mono)

### Card Styles
Standard card pattern used throughout:
```css
background: linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))
border: 1px solid rgba(255,255,255,0.08)
border-radius: 16px
box-shadow: 0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)
```

### Spacing
- Section margin-bottom: `46px`
- Card padding: `22px` (stats), `18px` (quality columns)
- Grid gaps: `18px` (main), `16px` (quality grid)

## Development Workflow

### Running the Application

You'll need **3 terminal windows** for development:

**Terminal 1 - Backend Server**
```bash
cd backend
uvicorn main:app --reload
```
Auto-reloads on Python file changes.

**Terminal 2 - Frontend Dev Server**
```bash
cd frontend
npm run dev
```
Hot-reloads on React component changes.

**Terminal 3 - General Commands**
Git commits, file operations, etc.

### Making Changes

#### Adding a New Chart Type
1. Create new component in `/frontend/src/components/`
2. Import in `App.jsx`
3. Add button to chart toggle section
4. Add conditional render in chart display area

#### Adding a New Stat/Metric
1. Update backend `/upload` endpoint to calculate new metric
2. Update frontend components to display the metric
3. Ensure proper null handling and type conversion

#### Modifying the Design
- Most styles are **inline** for complex components (charts, cards)
- Use Tailwind utility classes for simple layout/spacing
- Match existing color palette and spacing conventions

## Important Notes

### Tailwind CSS v4
This project uses Tailwind CSS v4. The setup is minimal:
- `@import "tailwindcss";` in CSS
- Custom fonts configured in `@theme` directive
- Utility classes work as expected
- **However**: Complex styling (gradients, shadows, custom properties) is done with inline styles for better control

### Why Inline Styles?
For components like charts, cards, and the quality report:
- More precise control over complex gradients and shadows
- Easier to match the Claude Design mockup exactly
- Dynamic values (e.g., colors based on data) are simpler
- No need to generate Tailwind arbitrary values for one-off styles

### File Upload Size Limit
- Frontend accepts files up to 50MB
- Backend has default FastAPI limits (configurable if needed)

### Data Quality Scoring
Health score formula:
```
overall_score = 100 - total_null_percent - (outlier_count × 5)
clamped to [0, 100]
```

### Numeric Type Conversions
Always wrap pandas/numpy values in Python type constructors:
- `int()` for integers
- `float()` for floats
- `bool()` for booleans
- Prevents JSON serialization errors

## Common Development Tasks

### Update Chart Dimensions
Edit the component's radius/size constants and SVG viewBox.

### Change Color Palette
Update color variables in components and maintain consistency across cards, badges, and charts.

### Add New Quality Metric
1. Update backend `analyze_quality()` function
2. Add new field to response schema
3. Update QualityReport.jsx to display the metric

### Debug API Issues
- Check browser Network tab for request/response
- Check backend terminal for Python errors
- Verify CORS settings if request is blocked
- Ensure numpy types are converted before JSON serialization

## Testing Workflow

1. Start both servers
2. Upload a test CSV file
3. Verify all sections render correctly:
   - Dataset Overview stats
   - Data Preview table
   - Column Statistics cards
   - All three chart types (Bar, Line, Pie)
   - Data Quality Report with all cards
4. Test edge cases:
   - Empty CSV
   - CSV with missing values
   - CSV with only text columns
   - Large CSV files

## Resources

- React Docs: https://react.dev
- FastAPI Docs: https://fastapi.tiangolo.com
- pandas Docs: https://pandas.pydata.org
- Tailwind CSS v4: https://tailwindcss.com

---

Built with Claude Code by Wong Huai Wen (Raymond)
