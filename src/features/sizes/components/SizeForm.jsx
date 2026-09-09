import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import { sizeSchema } from "../schemas/sizeSchema";
import Input from "../../../components/ui/Input";

export default function SizeForm({ size = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (size) {
      reset({
        name: size.name,
        description: size.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [size, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Size"
        placeholder="eg. 40"
        error={errors.name?.message}
        {...register("name")}
      />

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#03152B]">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          className="w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm outline-none focus:border-[#2E7AF0] focus:ring-2 focus:ring-[#2E7AF0]/10"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save Size
        </Button>
      </div>
    </form>
  );
}
