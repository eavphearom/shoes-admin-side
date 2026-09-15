import { Edit2, Filter, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TablePagination from "../../../components/ui/TablePagination";

export default function CategoryList({
  categories,
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
  const [statusFilter, setStatusFilter] = useState("Active");
  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

  const visibleCategories = useMemo(() => {
    if (statusFilter === "All Statuses") {
      return categories;
    }

    return categories.filter(
      (category) => (category.status || "Active") === statusFilter,
    );
  }, [categories, statusFilter]);

  const firstItem = totalItems === 0 ? 0 : startIndex + 1;
  const lastItem = Math.min(startIndex + perPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-[#E5EAF1] p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
            />
            <Input
              placeholder="Search category..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>

          <div className="w-full sm:w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder="All Statuses"
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer h-9 items-center justify-center gap-2 rounded-lg border border-[#D7DFEA] bg-white px-3 text-sm font-medium text-[#03152B] transition hover:bg-[#F7F9FC]"
        >
          <Filter size={15} />
          More Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#CBD5E1] text-[#F97316]"
                  aria-label="Select all categories"
                />
              </th>
              <th className="w-16 px-4 py-3">#</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleCategories.map((category, index) => {
              const status = category.status || "Active";

              return (
                <tr
                  key={category.id}
                  className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#CBD5E1] text-[#F97316]"
                      aria-label={`Select ${category.name}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-[#64748B]">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#03152B]">
                      {category.name}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[#64748B]">
                    {category.description || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
                        status === "Active"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748B]">
                    {category.createdAt || "Today"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(category)}
                        className="rounded-lg p-2 text-[#64748B] cursor-pointer transition hover:bg-[#FFF7ED] hover:text-[#F97316]"
                        aria-label={`Edit ${category.name}`}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(category)}
                        className="rounded-lg p-2 text-[#64748B] cursor-pointer transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${category.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-[#64748B] cursor-pointer transition hover:bg-[#F1F5F9] hover:text-[#03152B]"
                        aria-label={`More actions for ${category.name}`}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        firstItem={firstItem}
        lastItem={lastItem}
        totalItems={totalItems}
        label="categories"
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
