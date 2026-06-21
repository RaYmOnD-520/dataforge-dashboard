import { useMemo } from 'react'

export default function StatsPanel({ stats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return null
  }

  const columns = Object.keys(stats)

  return (
    <div className="w-full">
      <div style={{
        display: 'grid',
        gridTemplateColumns: columns.length < 4 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '18px'
      }}>
        {columns.map((column, idx) => {
          const columnStats = stats[column]
          const isEmerald = idx % 2 === 0

          // Generate stable random heights for sparkline bars
          const sparklineData = useMemo(() =>
            Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20),
            [column]
          )

          return (
            <div
              key={column}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'linear-gradient(155deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {/* Header row: column name + data type badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono" style={{fontSize: '13px', color: '#e6f3ec', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '8px'}}>
                  {column}
                </h3>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    padding: '3px 7px',
                    borderRadius: '5px',
                    background: isEmerald ? 'rgba(52,224,161,0.1)' : 'rgba(34,184,207,0.1)',
                    border: `1px solid ${isEmerald ? 'rgba(52,224,161,0.2)' : 'rgba(34,184,207,0.2)'}`,
                    color: isEmerald ? '#34e0a1' : '#22b8cf',
                    whiteSpace: 'nowrap'
                  }}
                >
                  float64
                </span>
              </div>

              {/* Stats grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px 10px',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{fontSize: '10px', color: '#586660', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '4px'}}>MEAN</div>
                  <div className="font-mono" style={{fontSize: '17px', color: '#f6fffb', fontWeight: '600'}}>
                    {columnStats.mean !== null ? columnStats.mean.toFixed(1) : 'N/A'}
                  </div>
                </div>
                <div>
                  <div style={{fontSize: '10px', color: '#586660', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '4px'}}>STD</div>
                  <div className="font-mono" style={{fontSize: '17px', color: '#f6fffb', fontWeight: '600'}}>
                    {columnStats.mean !== null ? (columnStats.max - columnStats.min).toFixed(1) : 'N/A'}
                  </div>
                </div>
                <div>
                  <div style={{fontSize: '10px', color: '#586660', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '4px'}}>MIN</div>
                  <div className="font-mono" style={{fontSize: '17px', color: '#f6fffb', fontWeight: '600'}}>
                    {columnStats.min !== null ? columnStats.min.toLocaleString() : 'N/A'}
                  </div>
                </div>
                <div>
                  <div style={{fontSize: '10px', color: '#586660', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '4px'}}>MAX</div>
                  <div className="font-mono" style={{fontSize: '17px', color: '#f6fffb', fontWeight: '600'}}>
                    {columnStats.max !== null ? columnStats.max.toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Sparkline bars */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3px',
                height: '34px',
                marginTop: '16px'
              }}>
                {sparklineData.map((height, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${height}%`,
                      borderRadius: '2px 2px 0 0',
                      background: 'linear-gradient(180deg, #34e0a1, rgba(52,224,161,0.2))'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {columns.length === 0 && (
        <p className="font-mono text-center" style={{fontSize: '14px', color: '#586660', padding: '32px 0'}}>
          No numeric columns found in this dataset.
        </p>
      )}
    </div>
  )
}
