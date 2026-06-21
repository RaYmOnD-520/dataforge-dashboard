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
      <div className="overflow-x-auto rounded-2xl df-scroll" style={{
        background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
        <table className="w-full">
          <thead style={{
            background: 'linear-gradient(180deg, rgba(52,224,161,0.1), rgba(52,224,161,0.02))',
            borderBottom: '1px solid rgba(52,224,161,0.2)'
          }}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-5 py-4 text-left font-mono text-xs font-semibold whitespace-nowrap uppercase"
                  style={{
                    color: '#34e0a1',
                    letterSpacing: '0.6px'
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
                      className={`px-5 py-4 font-mono text-sm whitespace-nowrap ${isNum ? 'text-right' : 'text-left'}`}
                      style={{color: '#e6f3ec'}}
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
      <p className="text-xs font-mono mt-3" style={{color: '#586660'}}>
        Showing {previewData.length} of {data.length} rows
      </p>
    </div>
  )
}
