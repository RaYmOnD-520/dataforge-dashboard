import { useState } from 'react'

const COLORS = ['#34e0a1', '#22b8cf', '#2dd4bf', '#4ade80', '#5eead4', '#86efac']

export default function PieChart({ data, columns, numericColumns }) {
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

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  // Calculate donut chart segments - matching Claude Design dimensions
  const innerRadius = 74
  const outerRadius = 120
  const centerX = 150
  const centerY = 150

  const createArc = (startAngle, endAngle, innerR, outerR) => {
    const start = polarToCartesian(centerX, centerY, outerR, endAngle)
    const end = polarToCartesian(centerX, centerY, outerR, startAngle)
    const innerStart = polarToCartesian(centerX, centerY, innerR, endAngle)
    const innerEnd = polarToCartesian(centerX, centerY, innerR, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      'M', start.x, start.y,
      'A', outerR, outerR, 0, largeArcFlag, 0, end.x, end.y,
      'L', innerEnd.x, innerEnd.y,
      'A', innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'Z'
    ].join(' ')
  }

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  let currentAngle = 0
  const segments = chartData.map((item, index) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0
    const angle = (item.value / total) * 360
    const segment = {
      ...item,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: COLORS[index % COLORS.length]
    }
    currentAngle += angle
    return segment
  })

  return (
    <div className="w-full">
      {/* Select column dropdown ABOVE the chart container */}
      <div className="flex items-center gap-2" style={{marginTop: '16px', marginBottom: '16px'}}>
        <label htmlFor="pie-column-select" className="font-mono text-xs" style={{color: '#7b8983'}}>
          Select column:
        </label>
        <select
          id="pie-column-select"
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

      {/* Chart container */}
      <div className="rounded-lg" style={{
        marginTop: '16px',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
        border: '1px solid rgba(255,255,255,0.07)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '40px',
          justifyContent: 'center',
          padding: '40px 32px',
          minHeight: '300px',
          flexWrap: 'wrap'
        }}>
          {/* Left side: Donut chart */}
          <div style={{ position: 'relative', width: '300px', height: '300px', flex: 'none' }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={createArc(segment.startAngle, segment.endAngle, innerRadius, outerRadius)}
                  fill={segment.color}
                  stroke="#0a100d"
                  strokeWidth="3"
                  style={{
                    transformOrigin: `${centerX}px ${centerY}px`,
                    transform: 'scale(1)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`
                  }}
                />
              ))}
            </svg>
            {/* Center text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div className="font-mono" style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#f6fffb',
                lineHeight: '1.2'
              }}>
                {total.toLocaleString()}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#7b8983',
                marginTop: '4px',
                letterSpacing: '0.5px'
              }}>
                total
              </div>
            </div>
          </div>

          {/* Right side: Legend */}
          <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {segments.map((segment, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 12px',
                  borderRadius: '9px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {/* Color dot */}
                <div style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '3px',
                  background: segment.color,
                  boxShadow: `0 0 8px ${segment.color}88`,
                  flex: 'none'
                }}></div>

                {/* Label */}
                <div style={{
                  fontSize: '13px',
                  color: '#cfe6dc',
                  flex: 'none'
                }}>
                  {segment.name}
                </div>

                {/* Dotted spacer */}
                <span style={{
                  flex: 1,
                  height: '0px',
                  borderBottom: '1px dotted rgba(255,255,255,0.18)',
                  margin: '0 4px'
                }}></span>

                {/* Value */}
                <div className="font-mono" style={{
                  fontSize: '13px',
                  color: '#f6fffb',
                  fontWeight: '600',
                  flex: 'none'
                }}>
                  {segment.value.toLocaleString()}
                </div>

                {/* Percentage */}
                <div className="font-mono" style={{
                  fontSize: '11px',
                  color: segment.color,
                  width: '40px',
                  textAlign: 'right',
                  flex: 'none'
                }}>
                  {Math.round(segment.percentage)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
