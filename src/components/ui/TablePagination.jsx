import Select from "./Select";

const perPageOptions = [
  ...Array.from({ length: 10 }, (_, index) => index + 1),
  ...Array.from({ length: 9 }, (_, index) => (index + 2) * 10),
].map((value) => ({
  value: String(value),
  label: String(value),
}));

export default function TablePagination({
  firstItem,
  lastItem,
  totalItems,
  label,
  page,
  pages,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
  handlePerPageChange,
}) {
  const changePerPage = onPerPageChange || handlePerPageChange;

  return (
    <div className="flex flex-col gap-3 border-t border-[#E5EAF1] px-4 py-3 text-sm text-[#64748B] lg:flex-row lg:items-center lg:justify-between">
      <p>
        Showing {firstItem} to {lastItem} of {totalItems} {label}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {changePerPage && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-xs font-medium text-[#64748B]">
              Rows per page
            </span>
            <div className="w-20">
              <Select
                value={String(perPage)}
                onChange={(event) => changePerPage(event.target.value)}
                options={perPageOptions}
                placeholder="10"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer rounded-lg px-3 py-2 font-medium transition hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`h-8 w-8 cursor-pointer rounded-lg text-sm font-semibold transition ${
                page === pageNumber
                  ? "bg-[#03152B] text-white"
                  : "hover:bg-[#F1F5F9]"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer rounded-lg px-3 py-2 font-medium transition hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
