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

  // Calculate donut chart segments - larger size
  const innerRadius = 95
  const outerRadius = 150
  const centerX = 170
  const centerY = 170

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
          gap: '60px',
          justifyContent: 'center',
          padding: '40px 32px',
          minHeight: '380px'
        }}>
          {/* Left side: Donut chart */}
          <div style={{ position: 'relative', width: '340px', height: '340px', flex: 'none' }}>
            <svg width="340" height="340" viewBox="0 0 340 340">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={createArc(segment.startAngle, segment.endAngle, innerRadius, outerRadius)}
                  fill={segment.color}
                  style={{ transition: 'opacity 0.2s' }}
                  opacity="0.9"
                />
              ))}
            </svg>
            {/* Center text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div className="font-mono" style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#f6fffb',
                lineHeight: '1.2'
              }}>
                {total.toLocaleString()}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#7b8983',
                marginTop: '4px'
              }}>
                total
              </div>
            </div>
          </div>

          {/* Right side: Legend */}
          <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {segments.map((segment, index) => (
              <div
                key={index}
                style={{
                  padding: '12px 16px',
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
                  boxShadow: `0 0 8px ${segment.color}40`,
                  flexShrink: 0
                }}></div>

                {/* Label */}
                <div style={{
                  fontSize: '13px',
                  color: '#cfe6dc',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '120px',
                  flexShrink: 0
                }}>
                  {segment.name}
                </div>

                {/* Dotted spacer */}
                <span style={{
                  flex: 1,
                  height: '0px',
                  borderBottom: '1px dotted rgba(255,255,255,0.18)',
                  margin: '0 8px'
                }}></span>

                {/* Value */}
                <div className="font-mono" style={{
                  fontSize: '13px',
                  color: '#f6fffb',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {segment.value.toLocaleString()}
                </div>

                {/* Percentage */}
                <div className="font-mono" style={{
                  fontSize: '11px',
                  color: segment.color,
                  width: '40px',
                  textAlign: 'right',
                  flexShrink: 0
                }}>
                  {segment.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
