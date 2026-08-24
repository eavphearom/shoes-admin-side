export default function Table({
  columns,
  data,
  renderRow,
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-3 text-left text-sm font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) =>
            renderRow(item, index)
          )}
        </tbody>
      </table>
    </div>
  );
}