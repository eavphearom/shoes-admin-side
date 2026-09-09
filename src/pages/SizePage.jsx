import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import SizeForm from "../features/sizes/components/SizeForm";
import SizeList from "../features/sizes/components/SizeList";
import useSizes from "../features/sizes/hooks/useSizes";

export default function SizePage() {
  const {
    sizes,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addSize,
    updateSize,
    deleteSize,
  } = useSizes();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (size) => {
    setSelectedSize(size);
    setIsEditOpen(true);
  };

  const handleDelete = (size) => {
    setSelectedSize(size);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedSize) return;

    deleteSize(selectedSize.id);
    setIsDeleteOpen(false);
    setSelectedSize(null);
  };

  const handleCreate = (data) => {
    addSize(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!selectedSize) return;

    updateSize(selectedSize.id, data);
    setIsEditOpen(false);
    setSelectedSize(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Sizes
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage size options used in product selects
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Size
        </Button>
      </div>

      <SizeList
        sizes={sizes}
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
        title="Create Size"
      >
        <SizeForm onSubmit={handleCreate} />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Size"
      >
        <SizeForm size={selectedSize} onSubmit={handleUpdate} />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Size"
        message={`Are you sure you want to delete "${selectedSize?.name}"?`}
      />
    </div>
  );
}
