import { useEffect, useState } from "react";
import productService from "../services/productService";
import { listProduct } from "../productFormModel";

export default function useProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    productService.list().then(data => { if (!cancelled) setProducts(data); })
      .catch(error => { if (!cancelled) setError(error.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);
  async function deleteProduct(id) {
    await productService.remove(id);
    setProducts(current => current.filter(product => product.id !== id));
  }
  const categoryOptions = ["All Categories", ...new Set(products.map(p => p.category))].map(value => ({ value, label: value }));
  const brandOptions = ["All Brands", ...new Set(products.map(p => p.brand))].map(value => ({ value, label: value }));
  const filtered = products.filter(product =>
    (categoryFilter === "All Categories" || product.category === categoryFilter) &&
    (brandFilter === "All Brands" || product.brand === brandFilter) &&
    product.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * perPage;
  return {
    products: filtered.slice(startIndex, startIndex + perPage).map(listProduct),
    search, handleSearch: value => { setSearch(value); setPage(1); },
    categoryFilter, handleCategoryFilter: value => { setCategoryFilter(value); setPage(1); }, categoryOptions,
    brandFilter, handleBrandFilter: value => { setBrandFilter(value); setPage(1); }, brandOptions,
    page: currentPage, setPage, totalPages, totalItems: filtered.length, startIndex, perPage,
    handlePerPageChange: value => { setPerPage(Number(value)); setPage(1); },
    deleteProduct, loading, error,
  };
}
