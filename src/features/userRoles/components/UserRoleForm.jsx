import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { userRoleSchema } from "../schemas/userRoleSchema";

const roleOptions = ["Super Admin", "Manager", "Staff"].map((role) => ({
  value: role,
  label: role,
}));

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default function UserRoleForm({ user = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Staff",
      status: "Active",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="Enter name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Role"
          options={roleOptions}
          error={errors.role?.message}
          {...register("role")}
        />
        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status")}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save User
        </Button>
      </div>
    </form>
  );
}
