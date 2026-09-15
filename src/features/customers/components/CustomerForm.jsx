import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { customerSchema } from "../schemas/customerSchema";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function CustomerForm({ customer = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: "Active",
      address: "",
    },
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
        address: customer.address || "",
      });
    }
  }, [customer, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Customer Name"
        placeholder="Enter customer name"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone"
          placeholder="Enter phone"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Select
        label="Status"
        options={statusOptions}
        error={errors.status?.message}
        {...register("status")}
      />

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#03152B]">
          Address
        </label>
        <textarea
          {...register("address")}
          placeholder="Enter address"
          className="w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save Customer
        </Button>
      </div>
    </form>
  );
}
