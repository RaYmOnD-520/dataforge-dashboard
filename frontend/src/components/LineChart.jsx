import { useState, useEffect } from 'react'

export default function LineChart({ data, columns, numericColumns }) {
  const [selectedColumn, setSelectedColumn] = useState(numericColumns[0] || '')
  const [dashOffset, setDashOffset] = useState(2000)

  useEffect(() => {
    // Trigger animation on mount or data change
    setDashOffset(2000)
    const timer = setTimeout(() => setDashOffset(0), 50)
    return () => clearTimeout(timer)
  }, [selectedColumn, data])

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

  // SVG dimensions and padding
  const svgWidth = 720
  const svgHeight = 300
  const padX = 40
  const padY = 36

  // Calculate plot area
  const plotWidth = svgWidth - padX * 2
  const plotHeight = svgHeight - padY * 2

  // Find min and max values for scaling
  const values = chartData.map(d => d.value)
  const minValue = Math.min(...values, 0)
  const maxValue = Math.max(...values, 1)
  const valueRange = maxValue - minValue || 1

  // Calculate points
  const points = chartData.map((item, index) => {
    const x = padX + (index / (chartData.length - 1 || 1)) * plotWidth
    const y = padY + plotHeight - ((item.value - minValue) / valueRange) * plotHeight
    return { x, y, ...item }
  })

  // Create path data for line
  const linePath = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ')

  // Create path data for area fill (closed path)
  const areaPath = [
    `M ${points[0].x} ${padY + plotHeight}`, // Start at bottom left
    ...points.map(p => `L ${p.x} ${p.y}`), // Line through all points
    `L ${points[points.length - 1].x} ${padY + plotHeight}`, // Down to bottom right
    'Z' // Close path
  ].join(' ')

  // Generate horizontal grid lines (5 lines)
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const y = padY + (plotHeight / 4) * i
    return { y, key: i }
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-2" style={{marginTop: '16px', marginBottom: '16px'}}>
        <label htmlFor="line-column-select" className="font-mono text-xs" style={{color: '#7b8983'}}>
          Select column:
        </label>
        <select
          id="line-column-select"
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

      <div className="rounded-lg" style={{
        marginTop: '16px',
        padding: '24px 0 16px 0',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
        border: '1px solid rgba(255,255,255,0.07)'
      }}>
        {/* Custom SVG Line Chart */}
        <svg
          viewBox="0 0 720 300"
          width="100%"
          height="300px"
          style={{overflow: 'visible'}}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="dfArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34e0a1" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#34e0a1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dfStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34e0a1" />
              <stop offset="100%" stopColor="#22b8cf" />
            </linearGradient>
            <filter id="dropShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(52,224,161,0.4)" />
            </filter>
          </defs>

          {/* Horizontal grid lines */}
          {gridLines.map(line => (
            <line
              key={line.key}
              x1={padX}
              y1={line.y}
              x2={svgWidth - padX}
              y2={line.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#dfArea)"
          />

          {/* Line path */}
          <path
            d={linePath}
            stroke="url(#dfStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#dropShadow)"
            strokeDasharray="2000"
            strokeDashoffset={dashOffset}
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)'
            }}
          />

          {/* Data points with labels */}
          {points.map((point, index) => (
            <g key={index}>
              {/* Outer glow circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="9"
                fill="#34e0a122"
              />

              {/* Inner dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill="#0a100d"
                stroke="#34e0a1"
                strokeWidth="2.5"
              />

              {/* Value label above dot */}
              <text
                x={point.x}
                y={point.y - 18}
                textAnchor="middle"
                fill="#cfe6dc"
                fontSize="12"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                {point.value.toLocaleString()}
              </text>

              {/* Category label below */}
              <text
                x={point.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill="#7b8983"
                fontSize="11"
                fontFamily="Inter, sans-serif"
              >
                {point.name.length > 8 ? point.name.substring(0, 7) + '…' : point.name}
              </text>
            </g>
          ))}
        </svg>

        <p className="text-xs text-gray-500 text-center" style={{marginTop: '12px', marginBottom: '8px'}}>
          Showing first 10 rows • X-axis: {categoryColumn} • Y-axis: {selectedColumn}
        </p>
      </div>
    </div>
  )
}
