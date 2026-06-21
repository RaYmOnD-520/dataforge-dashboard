import { useState, useRef } from 'react'
import axios from 'axios'

export default function FileUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file only')
      return false
    }
    setError('')
    return true
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file)
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      onUploadSuccess(response.data)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail)
      } else {
        setError(err.message || 'Failed to upload file')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-heading font-bold text-3xl mb-2" style={{color: '#f5fbf8'}}>
          Build your analysis
        </h2>
        <p className="font-mono text-sm" style={{color: '#7b8983'}}>Drop a dataset to begin forging.</p>
      </div>

      {/* Upload Zone */}
      <div
        className="relative rounded-3xl transition-all duration-300"
        style={{
          border: isDragging ? '1px dashed rgba(52,224,161,0.6)' : '1px dashed rgba(52,224,161,0.3)',
          background: isDragging
            ? 'radial-gradient(600px 400px at 50% 0%, rgba(52,224,161,0.08), transparent 70%)'
            : 'radial-gradient(600px 400px at 50% 0%, rgba(52,224,161,0.04), transparent 70%)',
          padding: '48px 24px',
          marginTop: '16px'
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="text-center flex flex-col items-center justify-center">
            {/* Floating Icon */}
            <div className="mb-8 df-float" style={{
              filter: 'drop-shadow(0 0 20px rgba(52,224,161,0.3))',
              paddingTop: '12px'
            }}>
              <svg
                className="h-16 w-16"
                style={{color: '#34e0a1'}}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="rounded-xl transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                color: '#06231a',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
            >
              Browse files
            </button>
            <p className="text-sm mt-4" style={{color: '#cfe6dc'}}>or drag and drop</p>
            <p className="text-xs mt-2 font-mono" style={{color: '#586660'}}>CSV files only</p>
          </div>
        ) : (
          <div>
            {/* File Info Bar */}
            <div className="flex items-center justify-between p-4 rounded-xl" style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded font-mono text-xs font-semibold" style={{
                  background: 'rgba(52,224,161,0.15)',
                  color: '#34e0a1'
                }}>CSV</span>
                <span className="font-mono text-sm" style={{color: '#cfe6dc'}}>{selectedFile.name}</span>
                <span className="font-mono text-xs" style={{color: '#7b8983'}}>{formatFileSize(selectedFile.size)}</span>
              </div>
              <div className="flex items-center gap-3">
                {!isLoading && (
                  <span className="font-mono text-xs flex items-center gap-1.5" style={{color: '#34e0a1'}}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    parsed
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {isLoading && (
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{background: 'rgba(255,255,255,0.05)'}}>
                <div className="h-full animate-pulse" style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #34e0a1, #22b8cf)'
                }}></div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleRemoveFile}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg font-mono text-sm transition-colors disabled:opacity-50"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: '#7b8983',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all disabled:opacity-50"
                style={{
                  background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                  color: '#06231a'
                }}
              >
                {isLoading ? 'Uploading...' : 'Upload & Process'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl" style={{
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <p className="text-sm font-mono" style={{color: '#f87171'}}>{error}</p>
        </div>
      )}
    </div>
  )
}
