import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import ColorForm from "../features/colors/components/ColorForm";
import ColorList from "../features/colors/components/ColorList";
import useColors from "../features/colors/hooks/useColors";

export default function ColorPage() {
  const {
    colors,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addColor,
    updateColor,
    deleteColor,
  } = useColors();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (color) => {
    setSelectedColor(color);
    setIsEditOpen(true);
  };

  const handleDelete = (color) => {
    setSelectedColor(color);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedColor) return;

    deleteColor(selectedColor.id);
    setIsDeleteOpen(false);
    setSelectedColor(null);
  };

  const handleCreate = (data) => {
    addColor(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!selectedColor) return;

    updateColor(selectedColor.id, data);
    setIsEditOpen(false);
    setSelectedColor(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Colors
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage color names, color codes, and descriptions
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Color
        </Button>
      </div>

      <ColorList
        colors={colors}
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
        title="Create Color"
      >
        <ColorForm onSubmit={handleCreate} />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Color"
      >
        <ColorForm color={selectedColor} onSubmit={handleUpdate} />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Color"
        message={`Are you sure you want to delete "${selectedColor?.name}"?`}
      />
    </div>
  );
}
