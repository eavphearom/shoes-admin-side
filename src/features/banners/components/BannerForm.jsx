import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { bannerSchema } from "../schemas/bannerSchema";

const placementOptions = [
  { value: "Homepage Hero", label: "Homepage Hero" },
  { value: "Category Header", label: "Category Header" },
  { value: "Promo Strip", label: "Promo Strip" },
  { value: "Sidebar Promo", label: "Sidebar Promo" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const defaultValues = {
  title: "",
  subtitle: "",
  placement: "",
  link: "",
  status: "Active",
  image: null,
};

export default function BannerForm({ banner = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (banner) {
      reset({
        title: banner.title,
        subtitle: banner.subtitle,
        placement: banner.placement,
        link: banner.link,
        status: banner.status,
        image: banner.image || null,
      });
    } else {
      reset(defaultValues);
    }
  }, [banner, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Banner Title"
        placeholder="Enter banner title"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Subtitle"
        placeholder="Enter short subtitle"
        error={errors.subtitle?.message}
        {...register("subtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Placement"
          options={placementOptions}
          placeholder="Select placement"
          error={errors.placement?.message}
          {...register("placement")}
        />

        <Select
          label="Status"
          options={statusOptions}
          placeholder="Select status"
          error={errors.status?.message}
          {...register("status")}
        />
      </div>

      <Input
        label="Link"
        placeholder="/products"
        error={errors.link?.message}
        {...register("link")}
      />

      <ImageUpload
        label="Banner Image"
        error={errors.image?.message}
        onChange={(file) => setValue("image", file)}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save Banner
        </Button>
      </div>
    </form>
  );
}
