import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import BannerForm from "../features/banners/components/BannerForm";
import BannerList from "../features/banners/components/BannerList";
import useBanners from "../features/banners/hooks/useBanners";

export default function BannerPage() {
  const data = useBanners();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsEditOpen(true);
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBanner) return;

    data.deleteBanner(selectedBanner.id);
    setIsDeleteOpen(false);
    setSelectedBanner(null);
  };

  const handleCreate = (formData) => {
    data.addBanner(formData);
    setIsCreateOpen(false);
  };

  const handleUpdate = (formData) => {
    if (!selectedBanner) return;

    data.updateBanner(selectedBanner.id, formData);
    setIsEditOpen(false);
    setSelectedBanner(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
            Banners
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage store banners, promotional images, and placements
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Banner
        </Button>
      </div>

      <BannerList {...data} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Banner"
        size="lg"
      >
        <BannerForm onSubmit={handleCreate} />
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Banner"
        size="lg"
      >
        <BannerForm banner={selectedBanner} onSubmit={handleUpdate} />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Banner"
        message={`Are you sure you want to delete "${selectedBanner?.title}"?`}
      />
    </div>
  );
}
