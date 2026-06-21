export default function DataTable({ data, columns }) {
  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return null
  }

  const previewData = data.slice(0, 10)

  // Detect numeric columns
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value)
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
                    textAlign: 'left',
                    padding: '14px 18px',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.6px',
                    color: '#34e0a1',
                    borderBottom: '1px solid rgba(52,224,161,0.2)',
                    textTransform: 'uppercase'
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
                style={{
                  borderBottom: rowIndex < previewData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column]
                  const isNum = value !== null && value !== undefined && isNumeric(value)
                  return (
                    <td
                      key={colIndex}
                      className="font-mono"
                      style={{
                        padding: '13px 18px',
                        fontSize: '13px',
                        color: '#e6f3ec'
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
