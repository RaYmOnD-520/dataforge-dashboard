import { useState } from 'react'

export default function BarChart({ data, columns, numericColumns }) {
  const [selectedColumn, setSelectedColumn] = useState(numericColumns[0] || '')

  if (!data || data.length === 0 || !columns || columns.length === 0 || !numericColumns || numericColumns.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-[#1e1e2e] rounded-lg p-8 border border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            No numeric columns available for visualization.
          </p>
        </div>
      </div>
    )
  }

  const categoryColumn = columns.find(col => !numericColumns.includes(col)) || columns[0]

  const chartData = data.slice(0, 10).map(row => ({
    name: String(row[categoryColumn] || 'N/A'),
    value: Number(row[selectedColumn]) || 0
  }))

  // Find max value for scaling
  const maxValue = Math.max(...chartData.map(item => item.value), 1)

  return (
    <div className="w-full">
      <div className="flex items-center gap-2" style={{marginTop: '16px', marginBottom: '16px'}}>
        <label htmlFor="column-select" className="font-mono text-xs" style={{color: '#7b8983'}}>
          Select column:
        </label>
        <select
          id="column-select"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="font-mono text-sm px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f5fbf8'
          }}
        >
          {numericColumns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-[#1e1e2e] rounded-lg border border-gray-700" style={{marginTop: '16px', padding: '24px 16px 16px'}}>
        {/* Custom Bar Chart */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: '320px',
          padding: '8px 4px 0',
          gap: '8px'
        }}>
          {chartData.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 100

            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  height: '100%'
                }}
              >
                {/* Value label above bar */}
                <div className="font-mono" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#cfe6dc',
                  marginTop: 'auto'
                }}>
                  {item.value.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '64px',
                    height: `${heightPercentage}%`,
                    borderRadius: '8px 8px 2px 2px',
                    background: 'linear-gradient(180deg, #34e0a1, rgba(52,224,161,0.22))',
                    boxShadow: '0 0 24px -4px rgba(52,224,161,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(52,224,161,0.44)',
                    transition: `height 0.9s cubic-bezier(.16,1,.3,1)`,
                    transitionDelay: `${index * 0.07}s`
                  }}
                />

                {/* Category label below bar */}
                <div style={{
                  fontSize: '11px',
                  color: '#7b8983',
                  textAlign: 'center',
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-500 text-center" style={{marginTop: '12px', marginBottom: '8px'}}>
          Showing first 10 rows • X-axis: {categoryColumn} • Y-axis: {selectedColumn}
        </p>
      </div>
    </div>
  )
}
