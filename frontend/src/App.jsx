import { useState } from 'react'
import FileUpload from './components/FileUpload'
import DataTable from './components/DataTable'

function App() {
  const [uploadedData, setUploadedData] = useState(null)

  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data)
    setUploadedData(data)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">DataForge Dashboard</h1>
        <FileUpload onUploadSuccess={handleUploadSuccess} />

        {uploadedData && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="mt-8">
              <DataTable data={uploadedData.preview} columns={uploadedData.columns} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
