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
          <div className="mb-16">
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Dataset Overview Section */}
          {uploadedData && (
            <div className="mb-16">
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
                <div className="relative overflow-hidden p-6 rounded-2xl" style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(52,224,161,0.15)'}}>
                    <svg className="w-4 h-4" style={{color: '#34e0a1'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #34e0a1, transparent)'}}></div>
                  <div className="text-xs uppercase tracking-wider mb-2 font-mono" style={{color: '#7b8983'}}>Total Rows</div>
                  <div className="font-mono font-bold text-3xl" style={{color: '#f6fffb'}}>{uploadedData.row_count.toLocaleString()}</div>
                </div>

                {/* Total Columns Card */}
                <div className="relative overflow-hidden p-6 rounded-2xl" style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(34,184,207,0.15)'}}>
                    <svg className="w-4 h-4" style={{color: '#22b8cf'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #22b8cf, transparent)'}}></div>
                  <div className="text-xs uppercase tracking-wider mb-2 font-mono" style={{color: '#7b8983'}}>Total Columns</div>
                  <div className="font-mono font-bold text-3xl" style={{color: '#f6fffb'}}>{uploadedData.column_count}</div>
                </div>

                {/* Numeric Columns Card */}
                <div className="relative overflow-hidden p-6 rounded-2xl" style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(52,224,161,0.15)'}}>
                    <span className="font-mono font-bold text-xs" style={{color: '#34e0a1'}}>#</span>
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #34e0a1, transparent)'}}></div>
                  <div className="text-xs uppercase tracking-wider mb-2 font-mono" style={{color: '#7b8983'}}>Numeric Columns</div>
                  <div className="font-mono font-bold text-3xl" style={{color: '#f6fffb'}}>{uploadedData.numeric_columns.length}</div>
                </div>

                {/* Filename Card */}
                <div className="relative overflow-hidden p-6 rounded-2xl" style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(34,184,207,0.15)'}}>
                    <svg className="w-4 h-4" style={{color: '#22b8cf'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #22b8cf, transparent)'}}></div>
                  <div className="text-xs uppercase tracking-wider mb-2 font-mono" style={{color: '#7b8983'}}>Filename</div>
                  <div className="font-mono text-sm truncate" style={{color: '#cfe6dc'}}>{uploadedData.filename}</div>
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
              <div className="p-8 rounded-2xl" style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 40px -24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}>
                <div className="flex items-center justify-between mb-6">
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
                <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <button
                    onClick={() => setActiveChart('bar')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all font-mono ${
                      activeChart === 'bar' ? '' : ''
                    }`}
                    style={activeChart === 'bar' ? {
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      color: '#06231a',
                      fontWeight: '600'
                    } : {
                      background: 'transparent',
                      color: '#7b8983'
                    }}
                  >
                    Bar Chart
                  </button>
                  <button
                    onClick={() => setActiveChart('line')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all font-mono ${
                      activeChart === 'line' ? '' : ''
                    }`}
                    style={activeChart === 'line' ? {
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      color: '#06231a',
                      fontWeight: '600'
                    } : {
                      background: 'transparent',
                      color: '#7b8983'
                    }}
                  >
                    Line Chart
                  </button>
                  <button
                    onClick={() => setActiveChart('pie')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all font-mono ${
                      activeChart === 'pie' ? '' : ''
                    }`}
                    style={activeChart === 'pie' ? {
                      background: 'linear-gradient(140deg, #34e0a1, #10b981)',
                      color: '#06231a',
                      fontWeight: '600'
                    } : {
                      background: 'transparent',
                      color: '#7b8983'
                    }}
                  >
                    Pie Chart
                  </button>
                </div>

                {/* Chart Display */}
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
