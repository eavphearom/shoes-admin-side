import { useState } from "react";

export default function useUserRoles() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@gptshoes.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "Aug 25, 2026",
    },
    {
      id: 2,
      name: "Store Manager",
      email: "manager@gptshoes.com",
      role: "Manager",
      status: "Active",
      lastLogin: "Aug 24, 2026",
    },
    {
      id: 3,
      name: "Inventory Staff",
      email: "inventory@gptshoes.com",
      role: "Staff",
      status: "Inactive",
      lastLogin: "Aug 20, 2026",
    },
  ]);

  const roleOptions = [
    { value: "All Roles", label: "All Roles" },
    { value: "Super Admin", label: "Super Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Staff", label: "Staff" },
  ];

  const addUser = (data) => {
    setUsers((prevUsers) => [
      {
        id: Date.now(),
        lastLogin: "Never",
        ...data,
      },
      ...prevUsers,
    ]);
  };

  const updateUser = (id, data) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...data } : user)),
    );
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === "All Roles" || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + perPage);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleFilter = (value) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    users: paginatedUsers,
    search,
    handleSearch,
    roleFilter,
    handleRoleFilter,
    roleOptions,
    page,
    setPage,
    totalPages,
    totalItems: filteredUsers.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addUser,
    updateUser,
    deleteUser,
  };
}
