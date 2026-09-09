import {
  Ban,
  Calendar,
  CheckCircle2,
  Circle,
  CreditCard,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Printer,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import authShoe from "../../../assets/auth-shoe.png";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

const orderItems = [
  {
    id: 1,
    product: "Air Max Pulse",
    subtitle: "Men's Shoes",
    sku: "AMP-NVY-08",
    color: "#1E2B3F",
    size: "8",
    qty: 1,
    unitPrice: 150,
  },
  {
    id: 2,
    product: "Performance Socks",
    subtitle: "Unisex",
    sku: "SOCK-WHT-M",
    color: "#F8FAFC",
    size: "M",
    qty: 1,
    unitPrice: 90,
  },
];

const orderSteps = [
  { key: "Pending", title: "Pending", description: "Order has been placed", time: "Oct 24, 2023 10:20 AM" },
  { key: "Confirmed", title: "Confirmed", description: "Order has been confirmed", time: "Oct 24, 2023 10:35 AM" },
  { key: "Processing", title: "Processing", description: "Order is being prepared", time: "Oct 24, 2023 01:10 PM" },
  { key: "Shipped", title: "Shipped", description: "Order has been shipped", time: "Oct 24, 2023 04:30 PM" },
  { key: "Delivered", title: "Delivered", description: "Order has been delivered", time: "-" },
  { key: "Cancelled", title: "Cancelled", description: "Order has been cancelled", time: "-" },
];

const paymentSteps = [
  { key: "Pending", title: "Unpaid", description: "Payment is pending", time: "Oct 24, 2023 10:20 AM" },
  { key: "Paid", title: "Paid", description: "Payment completed", time: "Oct 24, 2023 10:25 AM" },
  { key: "Refunded", title: "Refunded", description: "Not refunded", time: "-" },
];

export default function OrderDetail({ order, onClose, onUpdateStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "Pending");

  if (!order) return null;

  const subtotal = Number(order.total);
  const shippingFee = 10;
  const discount = 10;
  const grandTotal = subtotal + shippingFee - discount;

  const handleSubmitStatus = () => {
    onUpdateStatus?.({ status: selectedStatus });
  };

  return (
    <div className="-m-4 bg-white">
      <div className="space-y-4 p-3 sm:p-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#64748B]">
              <span>Orders</span>
              <span>/</span>
              <span className="font-semibold text-[#03152B]">Order Details</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#03152B] sm:text-2xl">
              Order Details
            </h3>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="secondary" className="gap-2">
              <Printer size={15} />
              Print
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="gap-2"
            >
              <X size={15} />
              Close
            </Button>
          </div>
        </div>

        <section className="grid gap-4 rounded-lg border border-[#D7DFEA] bg-white p-3 shadow-sm sm:p-4 lg:grid-cols-[1.4fr_1.1fr_1.1fr_1.2fr]">
          <div>
            <SectionLabel>Order Code</SectionLabel>
            <p className="mt-2 text-xl font-bold text-[#03152B] sm:text-2xl">
              #{order.orderNo}
            </p>
            <IconText icon={<Calendar size={16} />}>
              {order.date} at 10:20 AM
            </IconText>
          </div>

          <div>
            <SectionLabel>Order Status</SectionLabel>
            <div className="mt-2">
              <OrderBadge status={order.status} />
            </div>
            <p className="mt-3 text-xs text-[#64748B] sm:text-sm">
              Updated: Oct 24, 2023 04:30 PM
            </p>
          </div>

          <div>
            <SectionLabel>Payment Status</SectionLabel>
            <div className="mt-2">
              <PaymentBadge status={order.paymentStatus} />
            </div>
            <p className="mt-3 text-xs text-[#64748B] sm:text-sm">
              Paid on: Oct 24, 2023 10:25 AM
            </p>
          </div>

          <div className="border-[#E5EAF1] lg:border-l lg:pl-6">
            <SectionLabel>Payment Method</SectionLabel>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#03152B] sm:text-base">{order.paymentMethod}</p>
              <span className="text-xs font-black text-[#1D4ED8] sm:text-sm">VISA</span>
            </div>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard icon={<User size={16} />} title="Customer Information">
                <p className="text-sm font-bold text-[#03152B] sm:text-base">{order.customer}</p>
                <IconText icon={<Phone size={16} />}>+1 202-555-0187</IconText>
                <IconText icon={<Mail size={16} />}>
                  {order.customer.toLowerCase().replace(" ", ".")}@email.com
                </IconText>
              </InfoCard>

              <InfoCard icon={<MapPin size={16} />} title="Shipping Address">
                <p className="text-sm font-bold text-[#03152B] sm:text-base">{order.customer}</p>
                <p className="mt-2 text-xs leading-5 text-[#475569] sm:text-sm sm:leading-6">
                  742 Evergreen Terrace
                  <br />
                  Springfield, IL 62704
                  <br />
                  United States
                </p>
              </InfoCard>
            </div>

            <section className="overflow-hidden rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
              <CardHeader icon={<ShoppingBag size={16} />} title={`Order Items (${order.items})`} />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px]">
                  <thead>
                    <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-xs font-semibold text-[#64748B]">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Color</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-b border-[#EEF2F7] text-xs last:border-0 sm:text-sm">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F1F5F9]">
                              <img
                                src={authShoe}
                                alt={item.product}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-[#03152B]">{item.product}</p>
                              <p className="text-xs text-[#64748B]">{item.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#475569]">{item.sku}</td>
                        <td className="px-4 py-3">
                          <span
                            className="block h-5 w-5 rounded-full border border-[#CBD5E1]"
                            style={{ backgroundColor: item.color }}
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#03152B]">{item.size}</td>
                        <td className="px-4 py-3 font-semibold text-[#03152B]">{item.qty}</td>
                        <td className="px-4 py-3 font-semibold text-[#03152B]">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#03152B]">
                          ${(item.qty * item.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <InfoCard icon={<Calendar size={16} />} title="Order Status Tracking">
            <Timeline steps={orderSteps} activeKey={order.status} type="order" />
          </InfoCard>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.9fr_0.9fr_1.1fr]">
          <InfoCard icon={<ShoppingBag size={16} />} title="Order Summary">
            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <SummaryRow label="Shipping Fee" value={`$${shippingFee.toFixed(2)}`} />
            <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} danger />
            <div className="mt-4 flex items-center justify-between border-t border-[#E5EAF1] pt-4">
              <span className="font-bold text-[#03152B]">Grand Total</span>
              <span className="text-xl font-black text-[#3B32F6] sm:text-2xl">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </InfoCard>

          <InfoCard icon={<CreditCard size={16} />} title="Payment Information">
            <SummaryRow label="Payment Method" value={order.paymentMethod} />
            <SummaryRow label="Transaction ID" value="TXN-9P82KJ2S3L344" />
            <SummaryRow label="Amount" value={`$${grandTotal.toFixed(2)}`} />
            <SummaryRow label="Paid On" value="Oct 24, 2023 10:25 AM" />
          </InfoCard>

          <InfoCard title="Payment Status Timeline">
            <Timeline steps={paymentSteps} activeKey={order.paymentStatus} type="payment" />
          </InfoCard>
        </div>

        <section className="rounded-lg border border-[#D7DFFF] bg-[#F4F3FF] p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_160px] lg:items-center">
            <div>
              <h4 className="font-bold text-[#3B32F6]">Update Order Status</h4>
              <p className="mt-1 text-sm text-[#64748B]">
                Update the current order status
              </p>
            </div>
            <Select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              options={statusOptions}
            />
            <Button type="button" onClick={handleSubmitStatus}>
              Update Status
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function CardHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#E5EAF1] p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#3B32F6]">
        {icon}
      </span>
      <h4 className="text-sm font-bold text-[#03152B] sm:text-base">{title}</h4>
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <section className="rounded-lg border border-[#D7DFEA] bg-white p-3 shadow-sm sm:p-4">
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {icon && (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#3B32F6]">
              {icon}
            </span>
          )}
          <h4 className="text-sm font-bold text-[#03152B] sm:text-base">{title}</h4>
        </div>
      )}
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B] sm:text-xs">
      {children}
    </p>
  );
}

function IconText({ icon, children }) {
  return (
    <p className="mt-3 flex items-center gap-2 text-xs text-[#64748B] sm:text-sm">
      <span className="text-[#64748B]">{icon}</span>
      {children}
    </p>
  );
}

function SummaryRow({ label, value, danger = false }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-4 text-xs sm:text-sm">
      <span className="text-[#475569]">{label}</span>
      <span className={`font-bold ${danger ? "text-red-500" : "text-[#03152B]"}`}>
        {value}
      </span>
    </div>
  );
}

function Timeline({ steps, activeKey, type }) {
  const activeIndex = steps.findIndex((step) => step.key === activeKey);
  const normalizedActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div className="space-y-1">
      {steps.map((step, index) => {
        const isComplete = index < normalizedActiveIndex;
        const isActive = index === normalizedActiveIndex;
        const isCancelled = step.key === "Cancelled";

        return (
          <div
            key={step.key}
            className={`grid grid-cols-[26px_minmax(0,1fr)_72px] gap-2 rounded-lg p-2 text-xs sm:grid-cols-[32px_minmax(0,1fr)_110px] sm:gap-3 sm:text-sm ${
              isActive ? "bg-[#F4F3FF]" : ""
            }`}
          >
            <div className="relative flex justify-center">
              {index !== steps.length - 1 && (
                <span className="absolute top-7 h-full w-px bg-[#CBD5E1]" />
              )}
              <TimelineIcon
                complete={isComplete}
                active={isActive}
                cancelled={isCancelled}
                type={type}
              />
            </div>
            <div>
              <p
                className={`font-bold ${
                  isActive ? "text-[#3B32F6]" : "text-[#03152B]"
                }`}
              >
                {step.title}
              </p>
              <p className="mt-1 text-xs text-[#475569] sm:text-sm">{step.description}</p>
            </div>
            <p
              className={`text-right text-[11px] sm:text-sm ${
                isActive ? "text-[#3B32F6]" : "text-[#64748B]"
              }`}
            >
              {step.time}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function TimelineIcon({ complete, active, cancelled, type }) {
  if (cancelled && type === "order") {
    return (
      <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-500 ring-2 ring-red-500">
        <Ban size={12} />
      </span>
    );
  }

  if (complete) {
    return (
      <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
        <CheckCircle2 size={13} />
      </span>
    );
  }

  if (active) {
    return (
      <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#3B32F6] ring-2 ring-[#3B32F6]">
        {type === "order" ? <Truck size={12} /> : <CheckCircle2 size={12} />}
      </span>
    );
  }

  return (
    <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#94A3B8] ring-2 ring-[#CBD5E1]">
      <Circle size={8} fill="currentColor" />
    </span>
  );
}

function OrderBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",
    Processing: "bg-[#EAF1FF] text-[#2E7AF0]",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-[#DCFCE7] text-[#15803D]",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-bold sm:px-3 sm:py-2 sm:text-sm ${styles[status]}`}>
      {status === "Shipped" ? <Truck size={15} /> : <PackageCheck size={15} />}
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    Paid: "bg-[#DCFCE7] text-[#15803D]",
    Pending: "bg-amber-100 text-amber-700",
    Refunded: "bg-[#F1F5F9] text-[#64748B]",
    Failed: "bg-red-50 text-red-600",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-bold sm:px-3 sm:py-2 sm:text-sm ${styles[status] || styles.Pending}`}>
      <CheckCircle2 size={15} />
      {status}
    </span>
  );
}
