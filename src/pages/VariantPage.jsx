import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import VariantDetail from "../features/variants/components/VariantDetail";
import VariantForm from "../features/variants/components/VariantForm";
import VariantList from "../features/variants/components/VariantList";
import useVariants from "../features/variants/hooks/useVariants";

export default function VariantPage() {
  const {
    variants,
    search,
    handleSearch,
    productFilter,
    handleProductFilter,
    productOptions,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addVariant,
    updateVariant,
    deleteVariant,
  } = useVariants();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleView = (variant) => {5
    setSelectedVariant(variant);
    setIsDetailOpen(true);
  };

  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    setIsEditOpen(true);
  };

  const handleDelete = (variant) => {
    setSelectedVariant(variant);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedVariant) return;

    deleteVariant(selectedVariant.id);
    setIsDeleteOpen(false);
    setSelectedVariant(null);
  };

  const handleCreate = (data) => {
    addVariant(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!selectedVariant) return;

    updateVariant(selectedVariant.id, data);
    setIsEditOpen(false);
    setSelectedVariant(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Variants
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage product variant combinations for color, size, price, and
            stock
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Variant
        </Button>
      </div>

      <VariantList
        variants={variants}
        search={search}
        onSearch={handleSearch}
        productFilter={productFilter}
        onProductFilter={handleProductFilter}
        productOptions={productOptions}
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
        <VariantDetail
          variant={selectedVariant}
          onClose={() => setIsDetailOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Variant"
        size="xl"
      >
        <VariantForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Variant"
        size="xl"
      >
        <VariantForm
          variant={selectedVariant}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Variant"
        message={`Are you sure you want to delete "${selectedVariant?.sku}"?`}
      />
    </div>
  );
}
