import { useState } from "react";

export default function useSizes() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [sizes, setSizes] = useState([
    {
      id: 1,
      name: "US 7",
      description: "Standard adult shoe size",
      status: "Active",
      createdAt: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "US 8",
      description: "Common running shoe size",
      status: "Active",
      createdAt: "Oct 20, 2023",
    },
    {
      id: 3,
      name: "US 9",
      description: "Popular sneaker size",
      status: "Active",
      createdAt: "Oct 16, 2023",
    },
  ]);

  const addSize = (data) => {
    const newSize = {
      id: Date.now(),
      status: "Active",
      createdAt: "Today",
      ...data,
    };

    setSizes((prevSizes) => [newSize, ...prevSizes]);
  };

  const updateSize = (id, data) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) => (size.id === id ? { ...size, ...data } : size)),
    );
  };

  const deleteSize = (id) => {
    setSizes((prevSizes) => prevSizes.filter((size) => size.id !== id));
  };

  const filteredSizes = sizes.filter((size) =>
    size.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredSizes.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedSizes = filteredSizes.slice(startIndex, startIndex + perPage);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    sizes: paginatedSizes,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems: filteredSizes.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addSize,
    updateSize,
    deleteSize,
  };
}
