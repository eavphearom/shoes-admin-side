import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import ProductForm from "../features/products/components/ProductForm";
import ProductList from "../features/products/components/ProductList";
import useProducts from "../features/products/hooks/useProducts";
import ProductDetail from "../features/products/components/ProductDetail";

export default function ProductPage() {
  const {
    products,
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
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleView = (variant) => {
    setSelectedVariant(variant);
    setIsDetailOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id);
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleCreate = (data) => {
    addProduct(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!selectedProduct) return;

    updateProduct(selectedProduct.id, data);
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Products
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage products, categories, brands, and product images
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <ProductList
        products={products}
        search={search}
        onSearch={handleSearch}
        categoryFilter={categoryFilter}
        onCategoryFilter={handleCategoryFilter}
        categoryOptions={categoryOptions}
        brandFilter={brandFilter}
        onBrandFilter={handleBrandFilter}
        brandOptions={brandOptions}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        onPageChange={setPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Variant Details"
        size="xl"
      >
        <ProductDetail
          variant={selectedVariant}
          onClose={() => setIsDetailOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Product"
        size="full"
      >
        <ProductForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Product"
        size="xl"
      >
        <ProductForm
          product={selectedProduct}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
      />
    </div>
  );
}
