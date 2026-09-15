import { useState } from "react";

export default function useColors() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [colors, setColors] = useState([
    {
      id: 1,
      name: "Midnight Navy",
      colorCode: "#1E2B3F",
      description: "Dark navy color used for premium sneakers",
      status: "Active",
      createdAt: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "Royal Blue",
      colorCode: "#F97316",
      description: "Primary blue accent color",
      status: "Active",
      createdAt: "Oct 18, 2023",
    },
    {
      id: 3,
      name: "Cool Gray",
      colorCode: "#64748B",
      description: "Neutral gray for classic footwear",
      status: "Inactive",
      createdAt: "Oct 08, 2023",
    },
  ]);

  const addColor = (data) => {
    const newColor = {
      id: Date.now(),
      status: "Active",
      createdAt: "Today",
      ...data,
    };

    setColors((prevColors) => [newColor, ...prevColors]);
  };

  const updateColor = (id, data) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id ? { ...color, ...data } : color,
      ),
    );
  };

  const deleteColor = (id) => {
    setColors((prevColors) => prevColors.filter((color) => color.id !== id));
  };

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredColors.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedColors = filteredColors.slice(startIndex, startIndex + perPage);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    colors: paginatedColors,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems: filteredColors.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addColor,
    updateColor,
    deleteColor,
  };
}
