import { FlexTableProps } from '@/ui/model/FlexTable.interface.ts';

const FlexTable = <T extends object>({
  headers,
  data,
  renderCell,
  onRowClick,
}: FlexTableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead className="bg-green-100">
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.field)}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300"
                scope="col"
              >
                <div className="flex items-center gap-2">
                  {header.label}
                  {header.searchComponent && (
                    <div className="text-gray-400">
                      {header.searchComponent}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className="cursor-pointer hover:bg-green-50 transition duration-150 ease-in-out"
                role="row"
              >
                {headers.map((header) => (
                  <td
                    key={String(header.field)}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                    role="cell"
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
                className="text-center py-6 text-gray-600"
                role="cell"
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
