import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../schemas/categorySchema";
import { useEffect } from "react";
import Select from "../../../components/ui/Select";
export default function CategoryForm({ category = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  // Fill form for edit, clear form for create
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset]);

  // const categoryOptions = [
  //   { value: "electronics", label: "Electronics" },
  //   { value: "fashion", label: "Fashion" },
  //   { value: "home", label: "Home" },
  //   { value: "books", label: "Books" },
  // ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Category Name"
        placeholder="Enter category name"
        error={errors.name?.message}
        {...register("name")}
      />
      {/* <Select
        label="Category"
        options={categoryOptions}
        placeholder="Select category"
      /> */}
      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          placeholder="Enter description"
          className="w-full rounded-lg border p-3"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting}>
        Save Category
      </Button>
    </form>
  );
}
