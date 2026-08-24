import { useState } from "react";

// Category listing state and logic
export default function useCategories() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 2;

  // Mock data - replace with API later

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic products",
    },
    {
      id: 2,
      name: "Accessories",
      description: "Product accessories",
    },
    {
      id: 3,
      name: "Clothing",
      description: "Fashion and clothing",
    },
    {
      id: 4,
      name: "Shoes",
      description: "Shoes products",
    },
    {
      id: 5,
      name: "Phones",
      description: "Mobile phones",
    },
    {
      id: 6,
      name: "Computers",
      description: "Computer products",
    },
  ]);
  const addCategory = (data) => {
    const newCategory = {
      id: Date.now(),
      ...data,
    };

    setCategories((prevCategories) => [newCategory, ...prevCategories]);
  };
  const deleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id),
    );
  };
  const updateCategory = (id, data) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...data } : category,
      ),
    );
  };
  // Search categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / perPage);

  const startIndex = (page - 1) * perPage;

  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + perPage,
  );

  // Update search and reset pagination
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return {
    categories: paginatedCategories,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    addCategory,
    deleteCategory,
    updateCategory  
  };
}
