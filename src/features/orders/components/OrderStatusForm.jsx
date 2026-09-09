import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const statusSchema = z.object({
  status: z.string().min(1, "Order status is required"),
});

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
];

export default function OrderStatusForm({ order, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: order?.status || "Pending",
    },
  });

  useEffect(() => {
    reset({
      status: order?.status || "Pending",
    });
  }, [order, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-lg border border-[#D7DFEA] bg-[#F8FAFD] p-4">
        <p className="text-sm font-semibold text-[#03152B]">
          #{order?.orderNo}
        </p>
        <p className="mt-1 text-sm text-[#64748B]">
          Update fulfillment status for {order?.customer}.
        </p>
      </div>

      <Select
        label="Order Status"
        options={statusOptions}
        placeholder="Select status"
        error={errors.status?.message}
        {...register("status")}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Update Status
        </Button>
      </div>
    </form>
  );
}
