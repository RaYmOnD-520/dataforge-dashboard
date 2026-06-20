import { useState } from 'react'
import FileUpload from './components/FileUpload'
import DataTable from './components/DataTable'
import StatsPanel from './components/StatsPanel'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

function App() {
  const [uploadedData, setUploadedData] = useState(null)
  const [activeChart, setActiveChart] = useState('bar')

  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data)
    setUploadedData(data)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#1e1e2e] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-white">DataForge Dashboard</h1>
            </div>
            <div className="text-sm text-gray-400">Data Analysis Tool</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* File Upload Section */}
          <div className="mb-12">
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Dataset Overview Section */}
          {uploadedData && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Dataset Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Total Rows</div>
                  <div className="text-3xl font-bold text-indigo-400">{uploadedData.row_count.toLocaleString()}</div>
                </div>

                <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Total Columns</div>
                  <div className="text-3xl font-bold text-indigo-400">{uploadedData.column_count}</div>
                </div>

                <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Numeric Columns</div>
                  <div className="text-3xl font-bold text-indigo-400">{uploadedData.numeric_columns.length}</div>
                </div>

                <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Filename</div>
                  <div className="text-lg font-semibold text-white truncate">{uploadedData.filename}</div>
                </div>
              </div>
            </div>
          )}

          {/* Data Preview Section */}
          {uploadedData && (
            <div className="mb-12">
              <DataTable data={uploadedData.preview} columns={uploadedData.columns} />
            </div>
          )}

          {/* Column Statistics Section */}
          {uploadedData && (
            <div className="mb-12">
              <StatsPanel stats={uploadedData.summary_stats} />
            </div>
          )}

          {/* Data Visualisation Section */}
          {uploadedData && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Data Visualisation</h2>

              {/* Chart Toggle Buttons */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveChart('bar')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeChart === 'bar'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setActiveChart('line')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeChart === 'line'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Line Chart
                </button>
                <button
                  onClick={() => setActiveChart('pie')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeChart === 'pie'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Pie Chart
                </button>
              </div>

              {/* Chart Display */}
              {activeChart === 'bar' && (
                <BarChart
                  data={uploadedData.preview}
                  columns={uploadedData.columns}
                  numericColumns={uploadedData.numeric_columns}
                />
              )}
              {activeChart === 'line' && (
                <LineChart
                  data={uploadedData.preview}
                  columns={uploadedData.columns}
                  numericColumns={uploadedData.numeric_columns}
                />
              )}
              {activeChart === 'pie' && (
                <PieChart
                  data={uploadedData.preview}
                  columns={uploadedData.columns}
                  numericColumns={uploadedData.numeric_columns}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e1e2e] border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-400">
            DataForge Dashboard © 2025 — Built by Wong Huai Wen
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
