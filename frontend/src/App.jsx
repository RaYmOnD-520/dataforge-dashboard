import FileUpload from './components/FileUpload'

function App() {
  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">DataForge Dashboard</h1>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
      </div>
    </div>
  )
}

export default App
