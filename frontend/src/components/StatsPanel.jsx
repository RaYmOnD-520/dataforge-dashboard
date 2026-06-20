export default function StatsPanel({ stats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return null
  }

  const columns = Object.keys(stats)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Column Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnStats = stats[column]
          return (
            <div
              key={column}
              className="bg-[#1e1e2e] rounded-lg p-5 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 truncate">
                {column}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Min</span>
                  <span className="text-sm font-mono font-semibold text-indigo-400">
                    {columnStats.min !== null ? columnStats.min.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Max</span>
                  <span className="text-sm font-mono font-semibold text-indigo-400">
                    {columnStats.max !== null ? columnStats.max.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Mean</span>
                  <span className="text-sm font-mono font-semibold text-indigo-400">
                    {columnStats.mean !== null
                      ? columnStats.mean.toFixed(2)
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Nulls</span>
                  <span className="text-sm font-mono font-semibold text-gray-300">
                    {columnStats.null_count}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {columns.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-8">
          No numeric columns found in this dataset.
        </p>
      )}
    </div>
  )
}
