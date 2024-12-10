import { FlexTableProps } from '@/ui/model/FlexTable.interface.ts';

const FlexTable = <T extends object>({
  headers,
  data,
  renderCell,
  onRowClick,
}: FlexTableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        {/* Header */}
        <thead className="bg-gray-700">
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.field)}
                className="px-6 py-4 text-left text-sm font-bold text-gray-100 uppercase tracking-wide border-b border-gray-600"
              >
                <div className="flex items-center gap-2">
                  {header.label}
                  {header.searchComponent && (
                    <div className="text-gray-300">
                      {header.searchComponent}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className="cursor-pointer hover:bg-gray-700 transition-all duration-150"
              >
                {headers.map((header) => (
                  <td
                    key={String(header.field)}
                    className="px-6 py-4 text-sm text-gray-300"
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
                className="text-center py-6 text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlexTable;
