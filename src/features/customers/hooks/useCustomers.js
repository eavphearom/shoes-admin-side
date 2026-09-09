import { useState } from "react";

export default function useCustomers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      orders: 8,
      totalSpent: 1240,
      status: "Active",
      address: "12 Market Street, New York",
      joinedAt: "Oct 12, 2023",
    },
    {
      id: 2,
      name: "Maya Chen",
      email: "maya@example.com",
      phone: "+1 (555) 987-6543",
      orders: 5,
      totalSpent: 860,
      status: "Active",
      address: "48 River Road, Seattle",
      joinedAt: "Oct 08, 2023",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam@example.com",
      phone: "+1 (555) 222-9010",
      orders: 1,
      totalSpent: 150,
      status: "Inactive",
      address: "77 Hill Avenue, Austin",
      joinedAt: "Sep 29, 2023",
    },
  ]);

  const addCustomer = (data) => {
    setCustomers((prevCustomers) => [
      {
        id: Date.now(),
        orders: 0,
        totalSpent: 0,
        joinedAt: "Today",
        ...data,
      },
      ...prevCustomers,
    ]);
  };

  const updateCustomer = (id, data) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id ? { ...customer, ...data } : customer,
      ),
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id),
    );
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCustomers.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + perPage,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    customers: paginatedCustomers,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems: filteredCustomers.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
