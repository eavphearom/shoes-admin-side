import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import UserRoleForm from "../features/userRoles/components/UserRoleForm";
import UserRoleList from "../features/userRoles/components/UserRoleList";
import useUserRoles from "../features/userRoles/hooks/useUserRoles";

export default function UserRolePage() {
  const data = useUserRoles();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    data.deleteUser(selectedUser.id);
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  const handleCreate = (formData) => {
    data.addUser(formData);
    setIsCreateOpen(false);
  };

  const handleUpdate = (formData) => {
    if (!selectedUser) return;
    data.updateUser(selectedUser.id, formData);
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-5">
      <Header title="Users & Roles" subtitle="Manage admin users and access roles">
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add User
        </Button>
      </Header>

      <UserRoleList {...data} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create User">
        <UserRoleForm onSubmit={handleCreate} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit User">
        <UserRoleForm user={selectedUser} onSubmit={handleUpdate} />
      </Modal>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${selectedUser?.name}"?`}
      />
    </div>
  );
}

function Header({ title, subtitle, children }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
