import { useState, useEffect } from 'react'
import axios from 'axios'

export default function QualityReport({ data }) {
  const [qualityData, setQualityData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuality = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.post('http://localhost:8000/quality', {
          filename: data.filename,
          row_count: data.row_count,
          column_count: data.column_count,
          columns: data.columns,
          numeric_columns: data.numeric_columns,
          summary_stats: data.summary_stats,
          preview: data.preview
        })

        setQualityData(response.data)
      } catch (err) {
        setError(err.message || 'Failed to analyze data quality')
      } finally {
        setLoading(false)
      }
    }

    if (data) {
      fetchQuality()
    }
  }, [data])

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-[#1e1e2e] rounded-lg p-12 border border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-[#34e0a1] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-400">Analyzing data quality...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-[#1e1e2e] rounded-lg p-8 border border-red-900/50">
          <p className="text-sm text-red-400">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!qualityData) return null

  const getScoreColor = (score) => {
    if (score > 80) return '#34e0a1' // green
    if (score >= 50) return '#f59e0b' // yellow/amber
    return '#ef4444' // red
  }

  const getStatusColor = (status) => {
    if (status === 'good') return '#34e0a1'
    if (status === 'warning') return '#f59e0b'
    return '#ef4444'
  }

  const getStatusBg = (status) => {
    if (status === 'good') return 'rgba(52,224,161,0.1)'
    if (status === 'warning') return 'rgba(245,158,11,0.1)'
    return 'rgba(239,68,68,0.1)'
  }

  const getStatusBorder = (status) => {
    if (status === 'good') return 'rgba(52,224,161,0.25)'
    if (status === 'warning') return 'rgba(245,158,11,0.25)'
    return 'rgba(239,68,68,0.25)'
  }

  const scoreColor = getScoreColor(qualityData.overall_score)

  return (
    <div className="w-full" style={{ marginBottom: '46px' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px', marginBottom: '24px' }}>

        {/* Health Score */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '22px',
          borderRadius: '16px',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${scoreColor}33, transparent 70%)`
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '12px', color: '#7b8983', letterSpacing: '0.3px' }}>Health Score</span>
            <span style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${scoreColor}22`,
              border: `1px solid ${scoreColor}44`
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke={scoreColor} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: '700',
            fontSize: '30px',
            color: '#f6fffb',
            letterSpacing: '-1px'
          }}>
            {qualityData.overall_score}<span style={{ fontSize: '18px', color: '#7b8983' }}>%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              color: scoreColor
            }}>
              {qualityData.overall_score > 80 ? '✓ Excellent' : qualityData.overall_score >= 50 ? '⚠ Fair' : '✗ Poor'}
            </span>
          </div>
        </div>

        {/* Total Issues */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '22px',
          borderRadius: '16px',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.14), transparent 70%)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '12px', color: '#7b8983', letterSpacing: '0.3px' }}>Total Issues</span>
            <span style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.22)'
            }}>
              <span style={{ width: '3px', height: '13px', background: '#f59e0b', borderRadius: '2px' }}></span>
            </span>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: '700',
            fontSize: '30px',
            color: '#f6fffb',
            letterSpacing: '-1px'
          }}>
            {qualityData.total_issues}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              color: '#7b8983'
            }}>
              columns with issues
            </span>
          </div>
        </div>

        {/* Duplicate Rows */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '22px',
          borderRadius: '16px',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,184,207,0.14), transparent 70%)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '12px', color: '#7b8983', letterSpacing: '0.3px' }}>Duplicate Rows</span>
            <span style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(34,184,207,0.1)',
              border: '1px solid rgba(34,184,207,0.2)'
            }}>
              <span style={{ display: 'flex', gap: '2px' }}>
                <span style={{ width: '2px', height: '11px', background: '#22b8cf', borderRadius: '2px' }}></span>
                <span style={{ width: '2px', height: '11px', background: '#22b8cf', borderRadius: '2px' }}></span>
              </span>
            </span>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: '700',
            fontSize: '30px',
            color: '#f6fffb',
            letterSpacing: '-1px'
          }}>
            {qualityData.duplicate_rows}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              color: '#7b8983'
            }}>
              estimated duplicates
            </span>
          </div>
        </div>

      </div>

      {/* Column Quality Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {qualityData.columns.map((col, index) => (
          <div
            key={index}
            style={{
              padding: '18px',
              borderRadius: '16px',
              background: 'linear-gradient(155deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            {/* Column name and type */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '13px',
                color: '#e6f3ec',
                fontWeight: '500'
              }}>
                {col.name}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                color: col.dtype === 'numeric' ? '#34e0a1' : '#22b8cf',
                padding: '3px 7px',
                borderRadius: '5px',
                background: col.dtype === 'numeric' ? 'rgba(52,224,161,0.1)' : 'rgba(34,184,207,0.1)',
                border: col.dtype === 'numeric' ? '1px solid rgba(52,224,161,0.2)' : '1px solid rgba(34,184,207,0.2)'
              }}>
                {col.dtype}
              </span>
            </div>

            {/* Null count and percentage */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: '#586660' }}>NULL VALUES</span>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '11px',
                  color: '#cfe6dc'
                }}>
                  {col.null_count} ({col.null_percent}%)
                </span>
              </div>
              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(col.null_percent, 100)}%`,
                  height: '100%',
                  borderRadius: '3px',
                  background: getStatusColor(col.status),
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Status and outlier badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                color: getStatusColor(col.status),
                padding: '4px 8px',
                borderRadius: '6px',
                background: getStatusBg(col.status),
                border: `1px solid ${getStatusBorder(col.status)}`,
                textTransform: 'uppercase'
              }}>
                {col.status}
              </span>

              {col.has_outliers && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#f59e0b',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)'
                }}>
                  <span>⚠</span>
                  <span>OUTLIERS</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
