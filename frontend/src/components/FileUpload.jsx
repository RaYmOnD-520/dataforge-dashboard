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
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be under 50 MB')
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
    <div className="w-full">
      {/* Heading */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
        <h1 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '30px', letterSpacing: '-0.6px', color: '#f5fbf8' }}>
          Build your analysis
        </h1>
        <span style={{ fontSize: '14px', color: '#7b8983' }}>
          Drop a dataset to begin forging.
        </span>
      </div>

      {/* Upload Zone */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 32px',
          borderRadius: '20px',
          border: isDragging ? '2px dashed rgba(52,224,161,0.7)' : '2px dashed rgba(52,224,161,0.28)',
          background: isDragging
            ? 'linear-gradient(160deg, rgba(52,224,161,0.12), rgba(52,224,161,0.03))'
            : 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          boxShadow: isDragging ? '0 0 50px -10px rgba(52,224,161,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all .25s ease',
          cursor: 'pointer'
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: 'radial-gradient(600px 200px at 50% 0%, rgba(52,224,161,0.1), transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', textAlign: 'center' }}>
            {/* Floating upload icon */}
            <div className="df-float" style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, rgba(52,224,161,0.18), rgba(52,224,161,0.04))',
              border: '1px solid rgba(52,224,161,0.3)',
              boxShadow: '0 0 30px rgba(52,224,161,0.18)'
            }}>
              <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                {/* Upload arrow */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '2px',
                  width: '3px',
                  height: '14px',
                  borderRadius: '3px',
                  background: '#34e0a1',
                  transform: 'translateX(-50%)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '2px',
                  width: '13px',
                  height: '13px',
                  borderLeft: '3px solid #34e0a1',
                  borderTop: '3px solid #34e0a1',
                  borderRadius: '3px 0 0 0',
                  transform: 'translate(-50%, 0) rotate(45deg)'
                }}></div>
                {/* Base line */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '24px',
                  height: '3px',
                  borderRadius: '3px',
                  background: 'rgba(52,224,161,0.5)'
                }}></div>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '18px', color: '#eafff6' }}>
                {isDragging ? 'Release to forge' : 'Drag & drop your CSV'}
              </div>
              <div style={{ fontSize: '13px', color: '#7b8983', marginTop: '5px' }}>
                CSV up to 50 MB · UTF-8 · comma delimited
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '2px' }}>
              <button
                onClick={handleBrowseClick}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#06231a',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                  boxShadow: '0 6px 20px -6px rgba(52,224,161,0.6)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(140deg, #44eeb0, #18c896)'
                  e.target.style.boxShadow = '0 8px 26px -6px rgba(52,224,161,0.75)'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(140deg, #34e0a1, #10b981)'
                  e.target.style.boxShadow = '0 6px 20px -6px rgba(52,224,161,0.6)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Browse files
              </button>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#586660' }}>
                or paste a URL
              </span>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {/* File Info Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '12px',
              background: 'linear-gradient(155deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012))',
              border: '1px solid rgba(255,255,255,0.07)'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: 600,
                color: '#06231a',
                padding: '4px 7px',
                borderRadius: '5px',
                background: '#34e0a1'
              }}>CSV</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: '#cfe6dc'
              }}>{selectedFile.name}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#586660'
              }}>{formatFileSize(selectedFile.size)}</span>

              {/* Progress bar or parsed indicator */}
              {isLoading ? (
                <div style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  maxWidth: '220px',
                  marginLeft: 'auto'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #34e0a1, #22b8cf)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                </div>
              ) : (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#34e0a1',
                  marginLeft: 'auto'
                }}>parsed ✓</span>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '14px', display: 'flex', gap: '12px' }}>
              <button
                onClick={handleRemoveFile}
                disabled={isLoading}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#7b8983',
                  padding: '9px 18px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  background: 'rgba(255,255,255,0.03)',
                  opacity: isLoading ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                disabled={isLoading}
                style={{
                  flex: 1,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#06231a',
                  padding: '9px 18px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                  boxShadow: '0 6px 20px -6px rgba(52,224,161,0.6)',
                  opacity: isLoading ? 0.5 : 1,
                  transition: 'all 0.2s ease'
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
        <div style={{
          marginTop: '14px',
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: '#f87171',
            margin: 0
          }}>{error}</p>
        </div>
      )}
    </div>
  )
}
