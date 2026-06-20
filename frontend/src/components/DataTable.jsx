export default function DataTable({ data, columns }) {
  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return null
  }

  const previewData = data.slice(0, 10)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Data Preview</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full bg-[#1e1e2e]">
          <thead className="bg-indigo-500">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {previewData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-[#1e1e2e]' : 'bg-[#252536]'}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 text-sm text-gray-300 font-mono whitespace-nowrap"
                  >
                    {row[column] !== null && row[column] !== undefined
                      ? String(row[column])
                      : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Showing {previewData.length} of {data.length} rows
      </p>
    </div>
  )
}
