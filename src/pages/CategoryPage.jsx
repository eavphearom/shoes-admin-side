import { useState } from "react";
import { Plus } from "lucide-react";

import CategoryList from "../features/categories/components/CategoryList";
import CategoryForm from "../features/categories/components/CategoryForm";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmModal from "../components/ui/ConfirmModal";
import useCategories from "../features/categories/hooks/useCategories";

export default function CategoryListPage() {
  const {
    categories,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    perPage,
    handlePerPageChange,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (category) => {
    console.log("Category ID:", category.id);
    setSelectedCategory(category);
    setIsEditOpen(true);
  };
  const handleDelete = (category) => {
    console.log("Category ID:", category.id);
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedCategory) return;

    deleteCategory(selectedCategory.id);

    setIsDeleteOpen(false);
    setSelectedCategory(null);
  };
  const handleCreate = (data) => {
    addCategory(data);
    setIsCreateOpen(false);
  };
  const handleUpdate = (data) => {
    if (!selectedCategory) return;

    updateCategory(selectedCategory.id, data);

    setIsEditOpen(false);
    setSelectedCategory(null);
  };
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Categories
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage your product categories
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      {/* Category listing */}
      <CategoryList
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
        search={search}
        onSearch={handleSearch}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        onPageChange={setPage}
      />

      {/* Create modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Category"
        size="md"
      >
        <CategoryForm onSubmit={handleCreate} />
      </Modal>
      {/* Edit modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Category"
        size="md"
      >
        <CategoryForm category={selectedCategory} onSubmit={handleUpdate} />
      </Modal>

      {/* Delete modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
      />
    </div>
  );
}
