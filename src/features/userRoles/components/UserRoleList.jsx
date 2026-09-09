import { Edit2, Search, Trash2 } from "lucide-react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TablePagination from "../../../components/ui/TablePagination";

export default function UserRoleList({
  users,
  search,
  onSearch,
  roleFilter,
  onRoleFilter,
  roleOptions,
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
            />
            <Input
              placeholder="Search user..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={roleFilter}
              onChange={(e) => onRoleFilter(e.target.value)}
              options={roleOptions}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1FF] text-xs font-bold text-[#2E7AF0]">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#03152B]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#64748B]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-[#EAF1FF] px-2 py-1 text-xs font-semibold text-[#2E7AF0]">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-4 py-3 text-[#64748B]">
                  {user.lastLogin}
                </td>
                <td className="px-4 py-3">
                  <Actions item={user} onEdit={onEdit} onDelete={onDelete} />
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
        label="users"
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
      className={`rounded-md px-2 py-1 text-xs font-semibold ${
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
        className="cursor-pointer rounded-lg p-2 text-[#64748B] hover:bg-[#EAF1FF] hover:text-[#2E7AF0]"
        aria-label={`Edit ${item.name}`}
      >
        <Edit2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="cursor-pointer rounded-lg p-2 text-[#64748B] hover:bg-red-50 hover:text-red-600"
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
