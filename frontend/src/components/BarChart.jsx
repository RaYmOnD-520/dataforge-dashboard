import { useState } from 'react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BarChart({ data, columns, numericColumns }) {
  const [selectedColumn, setSelectedColumn] = useState(numericColumns[0] || '')

  if (!data || data.length === 0 || !columns || columns.length === 0 || !numericColumns || numericColumns.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Data Visualisation</h2>
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-300 mb-1">{payload[0].payload.name}</p>
          <p className="text-sm font-semibold text-indigo-400">
            {selectedColumn}: {payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Data Visualisation</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="column-select" className="text-sm text-gray-400">
            Select column:
          </label>
          <select
            id="column-select"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {numericColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#1e1e2e] rounded-lg p-6 border border-gray-700">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 text-center mt-4">
          Showing first 10 rows • X-axis: {categoryColumn} • Y-axis: {selectedColumn}
        </p>
      </div>
    </div>
  )
}
