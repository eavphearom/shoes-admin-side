import { useState } from "react";

export default function useOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNo: "ORD-7734",
      customer: "John Doe",
      date: "Oct 24, 2023",
      items: 2,
      total: 240,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      status: "Processing",
    },
    {
      id: 2,
      orderNo: "ORD-7735",
      customer: "Maya Chen",
      date: "Oct 24, 2023",
      items: 1,
      total: 150,
      paymentMethod: "PayPal",
      paymentStatus: "Paid",
      status: "Shipped",
    },
    {
      id: 3,
      orderNo: "ORD-7736",
      customer: "Sam Wilson",
      date: "Oct 23, 2023",
      items: 3,
      total: 360,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      status: "Pending",
    },
  ]);

  const statusOptions = [
    { value: "All Statuses", label: "All Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const updateOrder = (id, data) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, ...data } : order,
      ),
    );
  };

  const cancelOrder = (id) => {
    updateOrder(id, {
      status: "Cancelled",
      paymentStatus: "Refunded",
    });
  };

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "All Statuses" || order.status === statusFilter) &&
      (order.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + perPage);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    orders: paginatedOrders,
    search,
    handleSearch,
    statusFilter,
    handleStatusFilter,
    statusOptions,
    page,
    setPage,
    totalPages,
    totalItems: filteredOrders.length,
    startIndex,
    perPage,
    handlePerPageChange,
    updateOrder,
    cancelOrder,
  };
}
