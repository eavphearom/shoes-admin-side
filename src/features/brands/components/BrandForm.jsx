import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import { brandSchema } from "../schemas/BrandSchema";

export default function BrandForm({ brand = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: null,
    },
  });

  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name,
        description: brand.description,
        logo: brand.logo || null,
      });
    } else {
      reset({
        name: "",
        description: "",
        logo: null,
      });
    }
  }, [brand, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Brand Name"
        placeholder="Enter brand name"
        error={errors.name?.message}
        {...register("name")}
      />

      <ImageUpload
        label="Logo"
        error={errors.logo?.message}
        onChange={(file) => setValue("logo", file)}
      />

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#03152B]">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          className="w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
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
          Save Brand
        </Button>
      </div>
    </form>
  );
}
