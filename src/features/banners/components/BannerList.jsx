import { Edit2, Image, Search, Trash2 } from "lucide-react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TablePagination from "../../../components/ui/TablePagination";

export default function BannerList({
  loading = false,
  defaultOptions,
  statusFilter,
  onStatusFilter,
  banners,
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
            />
            <Input
              placeholder="Search banner..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>

          <div className="w-full sm:w-44">
            <Select
              value={statusFilter}
              onChange={(e) => onStatusFilter(e.target.value)}
              options={defaultOptions}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              {/* <th className="w-12 px-4 py-3">
                <input type="checkbox" aria-label="Select all banners" />
              </th> */}
              <th className="w-16 px-4 py-3">No</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Sub Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr
                key={banner.id}
                className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
              >
                {/* <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${banner.title}`}
                  />
                </td> */}
                <td className="px-4 py-3 text-[#64748B]">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg bg-[#FFF7ED]">
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Image size={18} className="text-[#F97316]" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#03152B]">{banner.title}</p>
                </td>
                <td className="px-4 py-3 text-[#64748B]">
                  <p className="mt-1 max-w-xs truncate text-xs text-[#64748B]">
                    {banner.subtitle || "-"}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <StatusBadge isActive={banner.is_active} />
                </td>
                <td className="px-4 py-3">
                  <Actions item={banner} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && (
        <Footer
          firstItem={firstItem}
          lastItem={lastItem}
          totalItems={totalItems}
          label="banners"
          page={page}
          pages={pages}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={onPageChange}
          handlePerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
        isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
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
        aria-label={`Edit ${item.title}`}
      >
        <Edit2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete ${item.title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function Footer(props) {
  return <TablePagination {...props} />;
}
