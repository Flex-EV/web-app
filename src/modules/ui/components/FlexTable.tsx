import { FlexTableProps } from '@/modules/ui/model/FlexTable.interface.ts';

const FlexTable = <T extends object>({
  headers,
  data,
  renderCell,
  onRowClick,
}: FlexTableProps<T>) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gradient-to-br from-green-50 to-green-100 border-b border-green-200">
            <tr>
              {headers.map((header) => (
                <th
                  key={String(header.field)}
                  className="px-6 py-4 text-left font-semibold text-green-800 uppercase tracking-wider relative group"
                  scope="col"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-grow">{header.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item)}
                  className="
                    hover:bg-green-50 
                    transition 
                    duration-200 
                    ease-in-out 
                    border-b border-gray-100 
                    last:border-b-0
                    cursor-pointer 
                    group
                    hover:shadow-sm
                  "
                >
                  {headers.map((header) => (
                    <td
                      key={String(header.field)}
                      className="
                        px-6 
                        py-4 
                        text-gray-700 
                        group-hover:text-green-800 
                        transition 
                        duration-200
                        whitespace-nowrap
                      "
                    >
                      {renderCell(item, header.field)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="
                    text-center 
                    py-8 
                    text-gray-500 
                    bg-gray-50 
                    italic
                  "
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlexTable;
