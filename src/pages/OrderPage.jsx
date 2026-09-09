import { useState } from "react";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import OrderDetail from "../features/orders/components/OrderDetail";
import OrderList from "../features/orders/components/OrderList";
import OrderStatusForm from "../features/orders/components/OrderStatusForm";
import useOrders from "../features/orders/hooks/useOrders";

export default function OrderPage() {
  const data = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setIsStatusOpen(true);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setIsCancelOpen(true);
  };

  const handleSubmitStatus = (formData) => {
    if (!selectedOrder) return;
    data.updateOrder(selectedOrder.id, formData);
    setIsStatusOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedOrder) return;
    data.cancelOrder(selectedOrder.id);
    setIsCancelOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-5">
      <Header title="Orders" subtitle="Manage customer orders and fulfillment" />

      <OrderList
        {...data}
        onView={handleView}
        onUpdateStatus={handleUpdateStatus}
        onCancel={handleCancel}
      />

      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Order Details"
        size="full"
      >
        <OrderDetail
          key={`${selectedOrder?.id}-${selectedOrder?.status}`}
          order={selectedOrder}
          onUpdateStatus={(formData) => {
            handleSubmitStatus(formData);
            setIsDetailOpen(false);
          }}
          onClose={() => setIsDetailOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        title="Update Order Status"
      >
        <OrderStatusForm
          order={selectedOrder}
          onSubmit={handleSubmitStatus}
          onCancel={() => setIsStatusOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Order"
        message={`Are you sure you want to cancel "${selectedOrder?.orderNo}"? This keeps the order history record.`}
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
