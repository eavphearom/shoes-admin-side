import { Edit2, Eye, Image, Search, Trash2 } from "lucide-react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TablePagination from "../../../components/ui/TablePagination";

export default function VariantList({
  variants,
  search,
  onSearch,
  productFilter,
  onProductFilter,
  productOptions,
  page,
  totalPages,
  totalItems,
  startIndex,
  perPage,
  handlePerPageChange,
  onPageChange,
  onView,
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
              placeholder="Search variant..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>

          <div className="w-full sm:w-52">
            <Select
              value={productFilter}
              onChange={(e) => onProductFilter(e.target.value)}
              options={productOptions}
              placeholder="All Products"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" aria-label="Select all variants" />
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Color</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr
                key={variant.id}
                className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" aria-label={`Select ${variant.sku}`} />
                </td>
               
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#2E7AF0]">
                      <Image size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#03152B]">
                        {variant.product}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-[#64748B]">{variant.sku}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-[#03152B]">
                    <span
                      className="h-5 w-5 rounded-full border border-[#D7DFEA]"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    {variant.color}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md border border-[#D7DFEA] bg-[#F8FAFD] px-2.5 py-1 text-sm font-semibold text-[#03152B]">
                    {variant.size}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-[#03152B]">
                  ${variant.price}
                </td>
                <td className="px-4 py-3 text-[#03152B]">{variant.stock}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={variant.status} />
                </td>
                <td className="px-4 py-3">
                  <Actions
                    item={variant}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
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
        label="variants"
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

function Actions({ item, onView, onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        onClick={() => onView(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-[#EAF1FF] hover:text-[#2E7AF0]"
        aria-label={`View ${item.sku}`}
      >
        <Eye size={15} />
      </button>
      <button
        type="button"
        onClick={() => onEdit(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-[#EAF1FF] hover:text-[#2E7AF0]"
        aria-label={`Edit ${item.sku}`}
      >
        <Edit2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete ${item.sku}`}
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
