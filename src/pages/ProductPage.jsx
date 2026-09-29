import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import ProductList from "../features/products/components/ProductList";
import useProducts from "../features/products/hooks/useProducts";
import ProductDetail from "../features/products/components/ProductDetail";

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    products, search, handleSearch, categoryFilter, handleCategoryFilter, categoryOptions,
    brandFilter, handleBrandFilter, brandOptions, page, setPage, totalPages, totalItems,
    startIndex, perPage, handlePerPageChange, deleteProduct, loading, error,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const handleView = (product) => { setSelectedVariant(product); setIsDetailOpen(true); };
  const handleDelete = (product) => { setSelectedProduct(product); setDeleteError(""); setIsDeleteOpen(true); };
  const handleConfirmDelete = async () => {
    if (!selectedProduct || deleting) return;
    setDeleting(true);
    try {
      await deleteProduct(selectedProduct.id);
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    } catch (error) { setDeleteError(error.message); }
    finally { setDeleting(false); }
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">Products</h1><p className="mt-1 text-sm text-[#64748B]">Manage products, categories, brands, and product images</p></div>
        <Button onClick={() => navigate("/products/create")} className="gap-2"><Plus size={16} />Add Product</Button>
      </div>
      {location.state?.notice && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">{location.state.notice}</p>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {loading ? <p role="status" className="text-sm text-[#64748B]">Loading products...</p> : <ProductList
        products={products} search={search} onSearch={handleSearch}
        categoryFilter={categoryFilter} onCategoryFilter={handleCategoryFilter} categoryOptions={categoryOptions}
        brandFilter={brandFilter} onBrandFilter={handleBrandFilter} brandOptions={brandOptions}
        page={page} totalPages={totalPages} totalItems={totalItems} startIndex={startIndex} perPage={perPage}
        handlePerPageChange={handlePerPageChange} onPageChange={setPage} onView={handleView}
        onEdit={product => navigate("/products/" + product.id + "/edit")} onDelete={handleDelete}
      />}
      {isDetailOpen && <ProductDetail key={selectedVariant?.id} product={selectedVariant} onClose={() => setIsDetailOpen(false)} />}
      <ConfirmModal isOpen={isDeleteOpen} onClose={() => { if (!deleting) setIsDeleteOpen(false); }} onConfirm={handleConfirmDelete} loading={deleting} title="Delete Product" message={deleteError || ('Are you sure you want to delete "' + selectedProduct?.name + '"?')} />
    </div>
  );
}
