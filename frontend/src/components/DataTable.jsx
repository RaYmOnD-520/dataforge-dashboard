import { useState } from 'react'

export default function DataTable({ data, columns }) {
  const [hoveredRow, setHoveredRow] = useState(null)

  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return null
  }

  const previewData = data.slice(0, 10)

  // Detect numeric columns
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }

  // Determine if each column is numeric by checking the first few non-null values
  const numericColumns = new Set()
  columns.forEach(column => {
    const sampleValues = data.slice(0, 20).map(row => row[column]).filter(v => v !== null && v !== undefined)
    if (sampleValues.length > 0 && sampleValues.every(v => isNumeric(v))) {
      numericColumns.add(column)
    }
  })

  // Map column names to specific widths
  const getColumnWidth = (columnName) => {
    const upperName = columnName.trim().toUpperCase()
    switch (upperName) {
      case 'NAME':
        return '25%'
      case 'AGE':
        return '10%'
      case 'SALARY':
        return '20%'
      case 'DEPARTMENT':
        return '30%'
      default:
        return 'auto'
    }
  }

  // Get text alignment for column
  const getColumnAlignment = (columnName) => {
    return 'center'
  }

  // Get custom padding for column
  const getColumnPadding = (columnName) => {
    const upperName = columnName.trim().toUpperCase()
    if (upperName === 'DEPARTMENT') {
      return '13px 8px' // reduced left and right padding
    }
    return '13px 18px'
  }

  // Get custom header padding for column
  const getHeaderPadding = (columnName) => {
    const upperName = columnName.trim().toUpperCase()
    if (upperName === 'DEPARTMENT') {
      return '14px 8px' // reduced left and right padding
    }
    return '14px 18px'
  }

  return (
    <div className="w-full">
      <div
        className="df-scroll"
        style={{
          overflowX: 'auto',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008))',
          boxShadow: '0 20px 50px -28px rgba(0,0,0,0.8)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
          <thead style={{
            background: 'linear-gradient(180deg, rgba(52,224,161,0.1), rgba(52,224,161,0.02))'
          }}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="font-mono"
                  style={{
                    textAlign: getColumnAlignment(column),
                    padding: getHeaderPadding(column),
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.6px',
                    color: '#34e0a1',
                    borderBottom: '1px solid rgba(52,224,161,0.2)',
                    textTransform: 'uppercase',
                    width: getColumnWidth(column)
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  borderBottom: rowIndex < previewData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: hoveredRow === rowIndex ? 'rgba(52,224,161,0.04)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column]
                  return (
                    <td
                      key={colIndex}
                      className="font-mono"
                      style={{
                        padding: getColumnPadding(column),
                        fontSize: '13px',
                        color: '#e6f3ec',
                        textAlign: getColumnAlignment(column),
                        width: getColumnWidth(column)
                      }}
                    >
                      {value !== null && value !== undefined ? String(value) : '—'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono" style={{fontSize: '12px', color: '#586660', marginTop: '12px'}}>
        Showing {previewData.length} of {data.length} rows
      </p>
    </div>
  )
}
