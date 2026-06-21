import { useState } from 'react'
import FileUpload from './components/FileUpload'
import DataTable from './components/DataTable'
import StatsPanel from './components/StatsPanel'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

function App() {
  const [uploadedData, setUploadedData] = useState(null)
  const [activeChart, setActiveChart] = useState('bar')

  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data)
    setUploadedData(data)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav style={{
        background: 'linear-gradient(180deg, rgba(10,16,13,0.92), rgba(10,16,13,0.72))',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '20px 36px',
        minHeight: '64px'
      }}>
        <div style={{maxWidth: '1240px', margin: '0 auto'}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Diamond D Logo */}
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rotate-45" style={{background: 'linear-gradient(135deg, #34e0a1, #10b981)', borderRadius: '4px'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading font-bold text-lg" style={{color: '#06231a'}}>D</span>
                </div>
              </div>
              {/* DataForge Text */}
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-xl" style={{color: '#f5fbf8'}}>DataForge</h1>
                <span className="font-mono rounded" style={{
                  color: '#34e0a1',
                  border: '1px solid #34e0a1',
                  letterSpacing: '0.5px',
                  fontSize: '9px',
                  padding: '3px 6px'
                }}>DASHBOARD</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs" style={{color: '#7b8983'}}>forge insight from raw data</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full df-pulse" style={{background: '#34e0a1'}}></div>
                <span className="font-mono text-xs" style={{color: '#586660'}}>live</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1" style={{padding: '40px 36px'}}>
        <div style={{maxWidth: '1240px', margin: '0 auto'}}>
          {/* File Upload Section */}
          <div style={{marginBottom: '40px'}}>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Dataset Overview Section */}
          {uploadedData && (
            <div className="mb-16" style={{marginTop: '40px'}}>
              <div className="flex items-center gap-3 mb-6">
                <div style={{
                  width: '5px',
                  height: '18px',
                  borderRadius: '3px',
                  background: 'linear-gradient(180deg, #34e0a1, #0e9e8e)'
                }}></div>
                <h2 className="font-heading font-bold text-2xl" style={{color: '#f5fbf8'}}>Dataset Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Rows Card */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(52,224,161,0.16), transparent 70%)'
                  }}></div>
                  <div className="flex items-start justify-between mb-3">
                    <div style={{fontSize: '12px', color: '#7b8983'}}>TOTAL ROWS</div>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '9px',
                      background: 'rgba(52,224,161,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px'
                    }}>
                      <div style={{width: '2px', height: '11px', background: '#34e0a1'}}></div>
                      <div style={{width: '2px', height: '11px', background: '#34e0a1'}}></div>
                      <div style={{width: '2px', height: '11px', background: '#34e0a1'}}></div>
                    </div>
                  </div>
                  <div className="font-mono" style={{fontWeight: '700', fontSize: '30px', color: '#f6fffb', letterSpacing: '-1px', marginBottom: '4px'}}>
                    {uploadedData.row_count.toLocaleString()}
                  </div>
                  <div style={{fontSize: '11px', color: '#34e0a1'}}>▲ 8.2% vs last import</div>
                </div>

                {/* Total Columns Card */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(52,224,161,0.16), transparent 70%)'
                  }}></div>
                  <div className="flex items-start justify-between mb-3">
                    <div style={{fontSize: '12px', color: '#7b8983'}}>TOTAL COLUMNS</div>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '9px',
                      background: 'rgba(34,184,207,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px'
                    }}>
                      <div style={{width: '11px', height: '2px', background: '#22b8cf'}}></div>
                      <div style={{width: '11px', height: '2px', background: '#22b8cf'}}></div>
                      <div style={{width: '11px', height: '2px', background: '#22b8cf'}}></div>
                    </div>
                  </div>
                  <div className="font-mono" style={{fontWeight: '700', fontSize: '30px', color: '#f6fffb', letterSpacing: '-1px', marginBottom: '4px'}}>
                    {uploadedData.column_count}
                  </div>
                  <div style={{fontSize: '11px', color: '#586660'}}>
                    {uploadedData.numeric_columns.length} numeric · {uploadedData.column_count - uploadedData.numeric_columns.length} text
                  </div>
                </div>

                {/* Numeric Columns Card */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(52,224,161,0.16), transparent 70%)'
                  }}></div>
                  <div className="flex items-start justify-between mb-3">
                    <div style={{fontSize: '12px', color: '#7b8983'}}>NUMERIC COLUMNS</div>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '9px',
                      background: 'rgba(52,224,161,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{width: '13px', height: '13px', border: '2px solid #34e0a1', borderRadius: '2px'}}></div>
                    </div>
                  </div>
                  <div className="font-mono" style={{fontWeight: '700', fontSize: '30px', color: '#f6fffb', letterSpacing: '-1px', marginBottom: '4px'}}>
                    {uploadedData.numeric_columns.length}
                  </div>
                  <div style={{fontSize: '11px', color: '#586660'}}>numeric fields detected</div>
                </div>

                {/* Filename Card */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(52,224,161,0.16), transparent 70%)'
                  }}></div>
                  <div className="flex items-start justify-between mb-3">
                    <div style={{fontSize: '12px', color: '#7b8983'}}>FILENAME</div>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '9px',
                      background: 'rgba(34,184,207,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22b8cf" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-mono" style={{fontWeight: '700', fontSize: '30px', color: '#f6fffb', letterSpacing: '-1px', marginBottom: '4px', fontSize: '18px', wordBreak: 'break-all'}}>
                    {uploadedData.filename}
                  </div>
                  <div style={{fontSize: '11px', color: '#586660'}}>active dataset</div>
                </div>
              </div>
            </div>
          )}

          {/* Data Preview Section */}
          {uploadedData && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div style={{
                  width: '5px',
                  height: '18px',
                  borderRadius: '3px',
                  background: 'linear-gradient(180deg, #34e0a1, #0e9e8e)'
                }}></div>
                <h2 className="font-heading font-bold text-2xl" style={{color: '#f5fbf8'}}>Data Preview</h2>
              </div>
              <DataTable data={uploadedData.preview} columns={uploadedData.columns} />
            </div>
          )}

          {/* Column Statistics Section */}
          {uploadedData && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div style={{
                  width: '5px',
                  height: '18px',
                  borderRadius: '3px',
                  background: 'linear-gradient(180deg, #34e0a1, #0e9e8e)'
                }}></div>
                <h2 className="font-heading font-bold text-2xl" style={{color: '#f5fbf8'}}>Column Statistics</h2>
              </div>
              <StatsPanel stats={uploadedData.summary_stats} />
            </div>
          )}

          {/* Data Visualisation Section */}
          {uploadedData && (
            <div className="mb-16">
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '26px 28px',
                borderRadius: '18px',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 60px -34px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-60px',
                  left: '-40px',
                  width: '260px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(52,224,161,0.1), transparent 70%)'
                }}></div>

                <div className="flex items-center justify-between mb-6" style={{position: 'relative', zIndex: 1}}>
                  <div>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: '5px',
                        height: '18px',
                        borderRadius: '3px',
                        background: 'linear-gradient(180deg, #34e0a1, #0e9e8e)'
                      }}></div>
                      <h2 className="font-heading font-bold text-2xl" style={{color: '#f5fbf8'}}>Data Visualisation</h2>
                    </div>
                    <p className="font-mono text-xs mt-1 ml-8" style={{color: '#586660'}}>column · values</p>
                  </div>
                </div>

                {/* Chart Toggle Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  padding: '5px',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  width: 'fit-content',
                  marginBottom: '24px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <button
                    onClick={() => setActiveChart('bar')}
                    className="font-mono transition-all"
                    style={activeChart === 'bar' ? {
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#06231a',
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      boxShadow: '0 4px 14px -4px rgba(52,224,161,0.6)',
                      border: 'none'
                    } : {
                      fontSize: '12px',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#8b9691',
                      background: 'transparent',
                      border: '1px solid transparent'
                    }}
                  >
                    Bar Chart
                  </button>
                  <button
                    onClick={() => setActiveChart('line')}
                    className="font-mono transition-all"
                    style={activeChart === 'line' ? {
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#06231a',
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      boxShadow: '0 4px 14px -4px rgba(52,224,161,0.6)',
                      border: 'none'
                    } : {
                      fontSize: '12px',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#8b9691',
                      background: 'transparent',
                      border: '1px solid transparent'
                    }}
                  >
                    Line Chart
                  </button>
                  <button
                    onClick={() => setActiveChart('pie')}
                    className="font-mono transition-all"
                    style={activeChart === 'pie' ? {
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#06231a',
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      boxShadow: '0 4px 14px -4px rgba(52,224,161,0.6)',
                      border: 'none'
                    } : {
                      fontSize: '12px',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      color: '#8b9691',
                      background: 'transparent',
                      border: '1px solid transparent'
                    }}
                  >
                    Pie Chart
                  </button>
                </div>

                {/* Chart Display */}
                <div style={{position: 'relative', zIndex: 1}}>
                  {activeChart === 'bar' && (
                    <BarChart
                      data={uploadedData.preview}
                      columns={uploadedData.columns}
                      numericColumns={uploadedData.numeric_columns}
                    />
                  )}
                  {activeChart === 'line' && (
                    <LineChart
                      data={uploadedData.preview}
                      columns={uploadedData.columns}
                      numericColumns={uploadedData.numeric_columns}
                    />
                  )}
                  {activeChart === 'pie' && (
                    <PieChart
                      data={uploadedData.preview}
                      columns={uploadedData.columns}
                      numericColumns={uploadedData.numeric_columns}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, transparent, rgba(52,224,161,0.03))',
        padding: '24px 36px'
      }}>
        <div style={{maxWidth: '1240px', margin: '0 auto'}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Small Diamond Logo */}
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 rotate-45" style={{background: 'linear-gradient(135deg, #34e0a1, #10b981)', borderRadius: '2px'}}></div>
              </div>
              <span className="font-mono text-xs" style={{color: '#586660'}}>
                DataForge · built by Wong Huai Wen
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/RaYmOnD-520"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs hover:opacity-80 transition-opacity"
                style={{color: '#7b8983'}}
              >
                GitHub
              </a>
              <span className="font-mono text-xs" style={{color: '#586660'}}>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
