import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import BrandForm from "../features/brands/components/BrandForm";
import BrandList from "../features/brands/components/BrandList";
import useBrands from "../features/brands/hooks/useBrands";

export default function BrandPage() {
  const {
    brands,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addBrand,
    updateBrand,
    deleteBrand,
  } = useBrands();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setIsEditOpen(true);
  };

  const handleDelete = (brand) => {
    setSelectedBrand(brand);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBrand) return;

    deleteBrand(selectedBrand.id);
    setIsDeleteOpen(false);
    setSelectedBrand(null);
  };

  const handleCreate = (data) => {
    addBrand(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!selectedBrand) return;

    updateBrand(selectedBrand.id, data);
    setIsEditOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Brands
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage product brands and brand logos
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Brand
        </Button>
      </div>

      <BrandList
        brands={brands}
        search={search}
        onSearch={handleSearch}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Brand"
      >
        <BrandForm onSubmit={handleCreate} />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Brand"
      >
        <BrandForm brand={selectedBrand} onSubmit={handleUpdate} />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Brand"
        message={`Are you sure you want to delete "${selectedBrand?.name}"?`}
      />
    </div>
  );
}
