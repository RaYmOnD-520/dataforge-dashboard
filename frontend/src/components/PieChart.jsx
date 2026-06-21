import { useState } from 'react'
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : 0
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-300 mb-1">{payload[0].name}</p>
          <p className="text-sm font-semibold text-white">
            {selectedColumn}: {payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">
            {percentage}% of total
          </p>
        </div>
      )
    }
    return null
  }

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent < 0.05) return null

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
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

      <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => <span className="text-sm text-gray-300">{value}</span>}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 text-center mt-4">
          Showing first 10 rows • Category: {categoryColumn} • Value: {selectedColumn}
        </p>
      </div>
    </div>
  )
}
