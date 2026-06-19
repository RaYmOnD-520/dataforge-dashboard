import { useState } from 'react'
import FileUpload from './components/FileUpload'

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
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Upload Results</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="font-semibold text-indigo-400">Filename:</span> {uploadedData.filename}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-indigo-400">Rows:</span> {uploadedData.row_count}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-indigo-400">Columns:</span> {uploadedData.column_count}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-indigo-400">Column Names:</span> {uploadedData.columns.join(', ')}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-indigo-400">Numeric Columns:</span> {uploadedData.numeric_columns.join(', ')}
              </p>
            </div>

            {uploadedData.preview && uploadedData.preview.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white mb-2">Preview (first 10 rows):</h3>
                <div className="overflow-x-auto">
                  <pre className="text-xs text-gray-300 bg-gray-900 p-4 rounded">
                    {JSON.stringify(uploadedData.preview, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
