import { useState } from "react";

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
    <div>
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>

        <Button onClick={() => setIsCreateOpen(true)}>Add Category</Button>
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
        onPageChange={setPage}
      />

      {/* Create modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Category"
      >
        <CategoryForm onSubmit={handleCreate} />
      </Modal>
      {/* Edit modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Category"
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
