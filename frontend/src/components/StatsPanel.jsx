export default function StatsPanel({ stats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return null
  }

  const columns = Object.keys(stats)

  // Generate random heights for sparkline bars
  const generateSparkline = () => {
    return Array.from({ length: 12 }, () => Math.random() * 100)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {columns.map((column, idx) => {
          const columnStats = stats[column]
          const sparklineData = generateSparkline()
          const isEmerald = idx % 2 === 0

          return (
            <div
              key={column}
              className="relative overflow-hidden p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {/* Column name and badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-semibold text-sm truncate" style={{color: '#f5fbf8'}}>
                  {column}
                </h3>
                <span className="px-2 py-0.5 rounded font-mono text-xs" style={{
                  background: isEmerald ? 'rgba(52,224,161,0.15)' : 'rgba(34,184,207,0.15)',
                  color: isEmerald ? '#34e0a1' : '#22b8cf'
                }}>
                  float64
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs uppercase font-mono mb-1" style={{color: '#7b8983'}}>Mean</div>
                  <div className="font-mono text-lg font-bold" style={{color: '#f6fffb'}}>
                    {columnStats.mean !== null ? columnStats.mean.toFixed(1) : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase font-mono mb-1" style={{color: '#7b8983'}}>Std</div>
                  <div className="font-mono text-lg font-bold" style={{color: '#f6fffb'}}>
                    {columnStats.mean !== null ? (columnStats.max - columnStats.min).toFixed(1) : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase font-mono mb-1" style={{color: '#7b8983'}}>Min</div>
                  <div className="font-mono text-lg font-bold" style={{color: '#f6fffb'}}>
                    {columnStats.min !== null ? columnStats.min.toLocaleString() : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase font-mono mb-1" style={{color: '#7b8983'}}>Max</div>
                  <div className="font-mono text-lg font-bold" style={{color: '#f6fffb'}}>
                    {columnStats.max !== null ? columnStats.max.toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Mini sparkline */}
              <div className="flex items-end gap-0.5 h-10">
                {sparklineData.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${height}%`,
                      background: isEmerald
                        ? 'linear-gradient(180deg, #34e0a1, #0e9e8e)'
                        : 'linear-gradient(180deg, #22b8cf, #0891b2)',
                      opacity: 0.6
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {columns.length === 0 && (
        <p className="text-sm font-mono text-center py-8" style={{color: '#586660'}}>
          No numeric columns found in this dataset.
        </p>
      )}
    </div>
  )
}
