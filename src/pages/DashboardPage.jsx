import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  MoreHorizontal,
  PackageCheck,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";

const stats = [
  {
    label: "Total Revenue",
    value: "$48,240",
    change: "+12.5%",
    trend: "up",
    icon: CircleDollarSign,
  },
  {
    label: "Orders",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    value: "4,392",
    change: "+5.7%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Low Stock",
    value: "18",
    change: "-3.1%",
    trend: "down",
    icon: PackageCheck,
  },
];

const salesData = [44, 58, 42, 72, 64, 86, 78, 92, 84, 96, 88, 104];

const recentOrders = [
  {
    id: "#ORD-1024",
    customer: "Dara Sok",
    product: "Air Runner Pro",
    amount: "$129.00",
    status: "Completed",
  },
  {
    id: "#ORD-1023",
    customer: "Maya Chen",
    product: "Urban Court Low",
    amount: "$89.00",
    status: "Processing",
  },
  {
    id: "#ORD-1022",
    customer: "Sam Wilson",
    product: "Trail Flex Max",
    amount: "$149.00",
    status: "Pending",
  },
  {
    id: "#ORD-1021",
    customer: "Nita Long",
    product: "Classic Leather",
    amount: "$99.00",
    status: "Completed",
  },
];

const topProducts = [
  {
    name: "Air Runner Pro",
    category: "Running Shoes",
    sales: 328,
    stock: 42,
  },
  {
    name: "Urban Court Low",
    category: "Sneakers",
    sales: 286,
    stock: 36,
  },
  {
    name: "Trail Flex Max",
    category: "Outdoor",
    sales: 214,
    stock: 18,
  },
];

const activities = [
  "New order placed for Air Runner Pro",
  "Classic Leather stock updated",
  "New customer account created",
  "Trail Flex Max moved to low stock",
];

function StatusBadge({ status }) {
  const colors = {
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Processing: "bg-blue-50 text-blue-700 ring-blue-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        colors[status]
      }`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your shoe store performance and recent activity.
          </p>
        </div>

        {/* <div className="flex gap-3">
          <Button variant="secondary">Export</Button>
          <Button>New Product</Button>
        </div> */}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    {stat.value}
                  </h2>
                </div>
                <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                  <Icon size={22} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon size={16} />
                  {stat.change}
                </span>
                <span className="text-slate-500">from last month</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Sales Overview
              </h2>
              <p className="text-sm text-slate-500">
                Monthly revenue across the year
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="More sales options"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex h-72 items-end gap-3 border-b border-slate-100 pb-4">
            {salesData.map((value, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div className="flex h-56 w-full items-end rounded-t-lg bg-slate-100">
                  <div
                    className="w-full rounded-t-lg bg-blue-600 transition hover:bg-blue-700"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Top Products
              </h2>
              <p className="text-sm text-slate-500">
                Best sellers this month
              </p>
            </div>
            <Star size={20} className="text-amber-400" />
          </div>

          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-700">
                    {product.sales} sold
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${Math.min(product.sales / 4, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {product.stock} items in stock
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Recent Orders
              </h2>
              <p className="text-sm text-slate-500">
                Latest purchases from customers
              </p>
            </div>
            <Button variant="secondary">View All</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 text-sm last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {order.product}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {order.amount}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Activity
          </h2>
          <p className="text-sm text-slate-500">
            Store updates and alerts
          </p>

          <div className="mt-5 space-y-4">
            {activities.map((activity, index) => (
              <div key={activity} className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {activity}
                  </p>
                  <p className="text-xs text-slate-500">
                    {index + 1}h ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
