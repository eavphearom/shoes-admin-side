import { useState } from "react";

export default function useVariants() {
  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All Products");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [variants, setVariants] = useState([
    {
      id: 1,
      product: "Air Max Pulse",
      color: "Midnight Navy",
      colorCode: "#1E2B3F",
      size: "US 8",
      sku: "AMP-NVY-08",
      price: 150,
      stock: 45,
      status: "Active",
      description: "Navy size 8 variant",
      createdAt: "Oct 24, 2023",
    },
    {
      id: 2,
      product: "Air Max Pulse",
      color: "Royal Blue",
      colorCode: "#F97316",
      size: "US 9",
      sku: "AMP-BLU-09",
      price: 150,
      stock: 28,
      status: "Active",
      description: "Blue size 9 variant",
      createdAt: "Oct 22, 2023",
    },
    {
      id: 3,
      product: "RS-X Toys",
      color: "Cool Gray",
      colorCode: "#64748B",
      size: "US 10",
      sku: "RSX-GRY-10",
      price: 110,
      stock: 0,
      status: "Inactive",
      description: "Gray size 10 variant",
      createdAt: "Oct 14, 2023",
    },
  ]);

  const addVariant = (data) => {
    const newVariant = {
      id: Date.now(),
      colorCode: "#F97316",
      createdAt: "Today",
      ...data,
    };

    setVariants((prevVariants) => [newVariant, ...prevVariants]);
  };

  const updateVariant = (id, data) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, ...data } : variant,
      ),
    );
  };

  const deleteVariant = (id) => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== id),
    );
  };

  const productOptions = [
    {
      value: "All Products",
      label: "All Products",
    },
    ...Array.from(new Set(variants.map((variant) => variant.product))).map(
      (product) => ({
        value: product,
        label: product,
      }),
    ),
  ];

  const filteredVariants = variants.filter(
    (variant) =>
      (productFilter === "All Products" ||
        variant.product === productFilter) &&
      (variant.sku.toLowerCase().includes(search.toLowerCase()) ||
        variant.product.toLowerCase().includes(search.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredVariants.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedVariants = filteredVariants.slice(
    startIndex,
    startIndex + perPage,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleProductFilter = (value) => {
    setProductFilter(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    variants: paginatedVariants,
    search,
    handleSearch,
    productFilter,
    handleProductFilter,
    productOptions,
    page,
    setPage,
    totalPages,
    totalItems: filteredVariants.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addVariant,
    updateVariant,
    deleteVariant,
  };
}
