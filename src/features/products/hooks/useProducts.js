import { useState } from "react";

export default function useProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Air Max Pulse",
      category: "Shoes",
      brand: "Nike",
      variants: 8,
      priceRange: "$120 - $180",
      stock: 145,
      status: "Active",
      description: "Responsive daily running sneaker",
      images: [],
      createdAt: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "Ultraboost Light",
      category: "Shoes",
      brand: "Adidas",
      variants: 12,
      priceRange: "$150 - $190",
      stock: 42,
      status: "Active",
      description: "Lightweight cushioned performance shoe",
      images: [],
      createdAt: "Oct 20, 2023",
    },
    {
      id: 3,
      name: "RS-X Toys",
      category: "Shoes",
      brand: "Puma",
      variants: 3,
      priceRange: "$110 - $110",
      stock: 0,
      status: "Draft",
      description: "Bold lifestyle sneaker",
      images: [],
      createdAt: "Oct 14, 2023",
    },
  ]);

  const addProduct = (data) => {
    const newProduct = {
      id: Date.now(),
      variants: 0,
      priceRange: "$0 - $0",
      stock: 0,
      createdAt: "Today",
      ...data,
    };

    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const updateProduct = (id, data) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...data } : product,
      ),
    );
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  const categoryOptions = [
    {
      value: "All Categories",
      label: "All Categories",
    },
    ...Array.from(new Set(products.map((product) => product.category))).map(
      (category) => ({
        value: category,
        label: category,
      }),
    ),
  ];

  const brandOptions = [
    {
      value: "All Brands",
      label: "All Brands",
    },
    ...Array.from(new Set(products.map((product) => product.brand))).map(
      (brand) => ({
        value: brand,
        label: brand,
      }),
    ),
  ];

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === "All Categories" ||
        product.category === categoryFilter) &&
      (brandFilter === "All Brands" || product.brand === brandFilter) &&
      product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + perPage,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
    setPage(1);
  };

  const handleBrandFilter = (value) => {
    setBrandFilter(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  return {
    products: paginatedProducts,
    search,
    handleSearch,
    categoryFilter,
    handleCategoryFilter,
    categoryOptions,
    brandFilter,
    handleBrandFilter,
    brandOptions,
    page,
    setPage,
    totalPages,
    totalItems: filteredProducts.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
