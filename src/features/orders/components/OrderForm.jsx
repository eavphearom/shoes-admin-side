import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { orderSchema } from "../schemas/orderSchema";

const customerOptions = ["John Doe", "Maya Chen", "Sam Wilson"].map((name) => ({
  value: name,
  label: name,
}));

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
  (status) => ({ value: status, label: status }),
);

const paymentOptions = ["Paid", "Pending", "Refunded"].map((payment) => ({
  value: payment,
  label: payment,
}));

export default function OrderForm({ order = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      status: "Pending",
      payment: "Pending",
      total: 0,
      items: 1,
      note: "",
    },
  });

  useEffect(() => {
    if (order) {
      reset({
        customer: order.customer,
        status: order.status,
        payment: order.payment,
        total: order.total,
        items: order.items,
        note: order.note || "",
      });
    }
  }, [order, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Customer"
        options={customerOptions}
        placeholder="Select customer"
        error={errors.customer?.message}
        {...register("customer")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Items"
          type="number"
          min="1"
          error={errors.items?.message}
          {...register("items")}
        />
        <Input
          label="Total"
          type="number"
          min="0"
          step="0.01"
          error={errors.total?.message}
          {...register("total")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Order Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status")}
        />
        <Select
          label="Payment"
          options={paymentOptions}
          error={errors.payment?.message}
          {...register("payment")}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#03152B]">
          Note
        </label>
        <textarea
          {...register("note")}
          placeholder="Enter order note"
          className="w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save Order
        </Button>
      </div>
    </form>
  );
}
