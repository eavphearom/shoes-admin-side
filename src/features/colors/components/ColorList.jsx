import { Edit2, Search, Trash2 } from "lucide-react";
import Input from "../../../components/ui/Input";
import TablePagination from "../../../components/ui/TablePagination";

export default function ColorList({
  colors,
  search,
  onSearch,
  page,
  totalPages,
  totalItems,
  startIndex,
  perPage,
  handlePerPageChange,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const firstItem = totalItems === 0 ? 0 : startIndex + 1;
  const lastItem = Math.min(startIndex + perPage, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
      <div className="border-b border-[#E5EAF1] p-4">
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
          />
          <Input
            placeholder="Search color..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" aria-label="Select all colors" />
              </th>
              <th className="w-16 px-4 py-3">#</th>
              <th className="px-4 py-3">Color Name</th>
              <th className="px-4 py-3">Color Code</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color, index) => (
              <tr
                key={color.id}
                className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" aria-label={`Select ${color.name}`} />
                </td>
                <td className="px-4 py-3 text-[#64748B]">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-3 font-semibold text-[#03152B]">
                  {color.name}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-semibold text-[#03152B]">
                    <span
                      className="h-5 w-5 rounded-full border border-[#D7DFEA]"
                      style={{ backgroundColor: color.colorCode }}
                    />
                    {color.colorCode}
                  </div>
                </td>
                <td className="px-4 py-3 text-[#64748B]">
                  {color.description || "-"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={color.status} />
                </td>
                <td className="px-4 py-3 text-[#64748B]">
                  {color.createdAt}
                </td>
                <td className="px-4 py-3">
                  <Actions item={color} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer
        firstItem={firstItem}
        lastItem={lastItem}
        totalItems={totalItems}
        label="colors"
        page={page}
        pages={pages}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={onPageChange}
        handlePerPageChange={handlePerPageChange}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
        status === "Active"
          ? "bg-[#DCFCE7] text-[#15803D]"
          : "bg-[#F1F5F9] text-[#64748B]"
      }`}
    >
      {status}
    </span>
  );
}

function Actions({ item, onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-[#FFF7ED] hover:text-[#F97316]"
        aria-label={`Edit ${item.name}`}
      >
        <Edit2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function Footer({
  ...props
}) {
  return <TablePagination {...props} />;
}
