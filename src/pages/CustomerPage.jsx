import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import CustomerForm from "../features/customers/components/CustomerForm";
import CustomerList from "../features/customers/components/CustomerList";
import useCustomers from "../features/customers/hooks/useCustomers";

export default function CustomerPage() {
  const data = useCustomers();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    data.deleteCustomer(selectedCustomer.id);
    setIsDeleteOpen(false);
    setSelectedCustomer(null);
  };

  const handleCreate = (formData) => {
    data.addCustomer(formData);
    setIsCreateOpen(false);
  };

  const handleUpdate = (formData) => {
    if (!selectedCustomer) return;
    data.updateCustomer(selectedCustomer.id, formData);
    setIsEditOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-5">
      <Header title="Customers" subtitle="Manage customer profiles and contact details">
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Add Customer
        </Button>
      </Header>

      <CustomerList {...data} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Customer">
        <CustomerForm onSubmit={handleCreate} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Customer">
        <CustomerForm customer={selectedCustomer} onSubmit={handleUpdate} />
      </Modal>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete "${selectedCustomer?.name}"?`}
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
