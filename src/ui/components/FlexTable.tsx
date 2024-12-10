import { FlexTableProps } from '@/ui/model/FlexTable.interface.ts';

const Table = <T extends object>({
  headers,
  data,
  renderCell,
  onRowClick,
}: FlexTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.field)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {header.label}
                {header.searchComponent}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(item)}
              className="cursor-pointer hover:bg-gray-600 transition-colors duration-150"
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
