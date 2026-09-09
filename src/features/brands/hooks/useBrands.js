import { useState } from "react";

export default function useBrands() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [brands, setBrands] = useState([
    {
      id: 1,
      name: "Nike",
      description: "Performance footwear and sportswear brand",
      logo: null,
      status: "Active",
      createdAt: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "Adidas",
      description: "Athletic shoes, apparel, and lifestyle products",
      logo: null,
      status: "Active",
      createdAt: "Oct 20, 2023",
    },
    {
      id: 3,
      name: "Puma",
      description: "Sport-inspired footwear and accessories",
      logo: null,
      status: "Inactive",
      createdAt: "Oct 12, 2023",
    },
  ]);

  const addBrand = (data) => {
    const newBrand = {
      id: Date.now(),
      status: "Active",
      createdAt: "Today",
      ...data,
    };

    setBrands((prevBrands) => [newBrand, ...prevBrands]);
  };

  const updateBrand = (id, data) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === id ? { ...brand, ...data } : brand,
      ),
    );
  };

  const deleteBrand = (id) => {
    setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredBrands.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedBrands = filteredBrands.slice(startIndex, startIndex + perPage);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    brands: paginatedBrands,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems: filteredBrands.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addBrand,
    updateBrand,
    deleteBrand,
  };
}
