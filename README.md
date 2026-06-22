# DataForge Dashboard

A modern data analytics dashboard for CSV file analysis with interactive visualizations and automated quality reporting.

## Features

- **📤 CSV Upload**: Drag-and-drop or browse to upload CSV files (up to 50MB)
- **📊 Dataset Overview**: Instant statistics on rows, columns, memory usage, and missing values
- **🔍 Data Preview**: Clean, scrollable table view of your dataset
- **📈 Column Statistics**: Detailed statistics for numeric columns with mini sparkline visualizations
- **📉 Interactive Charts**: Toggle between Bar, Line, and Pie chart visualizations
- **✅ Data Quality Report**: Automated quality analysis with health scores, duplicate detection, null analysis, and outlier warnings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite + Tailwind CSS v4 |
| **Backend** | Python + FastAPI + pandas |
| **Charts** | Custom SVG + Recharts |
| **Styling** | Tailwind CSS v4 + Inline Styles |
| **HTTP Client** | Axios |

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/RaYmOnD-520/dataforge-dashboard.git
cd dataforge-dashboard
```

#### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 3. Install Backend Dependencies

```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

You'll need **two terminal windows**:

#### Terminal 1: Start the Backend Server

```bash
cd backend
uvicorn main:app --reload
```

The backend API will run on `http://localhost:8000`

#### Terminal 2: Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173` to use the dashboard.

## Usage

1. **Upload a CSV file**: Drag and drop a CSV file or click "Browse files"
2. **Explore your data**: View dataset overview, preview rows, and column statistics
3. **Visualize**: Toggle between Bar, Line, and Pie charts to see different perspectives
4. **Check quality**: Scroll to the Data Quality Report to see health scores, duplicates, null values, and outliers

## Project Structure

```
dataforge-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BarChart.jsx
│   │   │   ├── LineChart.jsx
│   │   │   ├── PieChart.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── QualityReport.jsx
│   │   │   └── StatsPanel.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## API Endpoints

### `POST /upload`
Upload a CSV file and receive parsed data with preview and statistics.

### `POST /quality`
Analyze data quality and receive health scores, duplicate detection, and column-level analysis.

## Author

**Wong Huai Wen (Raymond)**  
GitHub: [@RaYmOnD-520](https://github.com/RaYmOnD-520)

---

Built with ❤️ using React, FastAPI, and pandas
