import { Eye, RefreshCw, Search, XCircle } from "lucide-react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TablePagination from "../../../components/ui/TablePagination";

export default function OrderList({
  orders,
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  statusOptions,
  page,
  totalPages,
  totalItems,
  startIndex,
  perPage,
  handlePerPageChange,
  onPageChange,
  onView,
  onUpdateStatus,
  onCancel,
}) {
  const firstItem = totalItems === 0 ? 0 : startIndex + 1;
  const lastItem = Math.min(startIndex + perPage, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
      <div className="border-b border-[#E5EAF1] p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]" />
            <Input placeholder="Search order..." value={search} onChange={(e) => onSearch(e.target.value)} className="h-9 pl-9" />
          </div>
          <div className="w-full sm:w-44">
            <Select value={statusFilter} onChange={(e) => onStatusFilter(e.target.value)} options={statusOptions} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              <th className="px-4 py-3">Order Code</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Items Count</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Order Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]">
                <td className="px-4 py-3 font-semibold text-[#03152B]">#{order.orderNo}</td>
                <td className="px-4 py-3 text-[#64748B]">{order.customer}</td>
                <td className="px-4 py-3 text-[#64748B]">{order.date}</td>
                <td className="px-4 py-3 text-[#03152B]">{order.items}</td>
                <td className="px-4 py-3 font-semibold text-[#03152B]">${order.total}</td>
                <td className="px-4 py-3 text-[#64748B]">{order.paymentMethod}</td>
                <td className="px-4 py-3"><PaymentBadge status={order.paymentStatus} /></td>
                <td className="px-4 py-3"><OrderBadge status={order.status} /></td>
                <td className="px-4 py-3">
                  <Actions
                    item={order}
                    label={order.orderNo}
                    onView={onView}
                    onUpdateStatus={onUpdateStatus}
                    onCancel={onCancel}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer firstItem={firstItem} lastItem={lastItem} totalItems={totalItems} label="orders" page={page} pages={pages} totalPages={totalPages} perPage={perPage} onPageChange={onPageChange} handlePerPageChange={handlePerPageChange} />
    </div>
  );
}

function OrderBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",
    Processing: "bg-[#EAF1FF] text-[#2E7AF0]",
    Shipped: "bg-indigo-50 text-indigo-700",
    Delivered: "bg-[#DCFCE7] text-[#15803D]",
    Cancelled: "bg-red-50 text-red-600",
  };
  return <span className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}

function PaymentBadge({ status }) {
  const styles = {
    Paid: "bg-[#DCFCE7] text-[#15803D]",
    Pending: "bg-amber-100 text-amber-700",
    Refunded: "bg-[#F1F5F9] text-[#64748B]",
    Failed: "bg-red-50 text-red-600",
  };

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}

function Actions({ item, label, onView, onUpdateStatus, onCancel }) {
  const canUpdateStatus = !["Delivered", "Cancelled"].includes(item.status);
  const canCancel = ["Pending", "Processing"].includes(item.status);

  return (
    <div className="flex justify-end gap-1">
      <button type="button" onClick={() => onView(item)} className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-[#EAF1FF] hover:text-[#2E7AF0]" aria-label={`View details for ${label}`}><Eye size={15} /></button>
      {canUpdateStatus && (
        <button type="button" onClick={() => onUpdateStatus(item)} className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-[#EAF1FF] hover:text-[#2E7AF0]" aria-label={`Update status for ${label}`}><RefreshCw size={15} /></button>
      )}
      {canCancel && (
        <button type="button" onClick={() => onCancel(item)} className="cursor-pointer rounded-lg p-2 text-[#64748B] transition hover:bg-red-50 hover:text-red-600" aria-label={`Cancel ${label}`}><XCircle size={15} /></button>
      )}
    </div>
  );
}

function Footer(props) {
  return <TablePagination {...props} />;
}
