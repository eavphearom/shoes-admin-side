import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "lucide-react";
import Button from "../../../components/ui/Button";
import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import { bannerSchema } from "../schemas/bannerSchema";

const defaultValues = {
  title: "",
  subtitle: "",
  image: null,
  is_active: true,
};

export default function BannerForm({ banner = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues,
  });

  const isActive = watch("is_active");

  useEffect(() => {
    if (banner) {
      reset({
        title: banner.title ?? "",
        subtitle: banner.subtitle ?? "",
        image: banner.image ?? null,
        is_active: banner.is_active ?? true,
      });
    } else {
      reset(defaultValues);
    }
  }, [banner, reset]);

  const handleInvalid = (errors) => {
    console.error("Form validation failed:", errors);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleInvalid)}
      className="space-y-5"
    >
      {/* First row: Information + Status */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left: Title and Subtitle */}
        <div className="space-y-4 rounded-xl border border-[#D7DFEA] bg-white p-5 lg:col-span-2">
          <h3 className="font-semibold text-[#03152B]">General Information</h3>

          <Input
            label="Title"
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
        </div>

        {/* Banner Status */}
        <div className="self-stretch overflow-hidden rounded-xl border border-[#D7DFEA] bg-white">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#D7DFEA] bg-[#F7FAFF] px-4 py-4">
            <Box size={20} className="text-[#03152B]" />
            <h3 className="text-base font-semibold text-[#03152B]">
              Banner Status
            </h3>
          </div>

          {/* Radio options */}
          <div className="space-y-5 p-4">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="radio"
                name="banner-status"
                checked={isActive === true}
                onChange={() =>
                  setValue("is_active", true, {
                    shouldValidate: true,
                  })
                }
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-blue-600"
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base text-[#03152B]">Active</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Active
                  </span>
                </div>

                <p className="text-xs leading-6 text-[#64748B]">
                  Banner will be visible on the website.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="radio"
                name="banner-status"
                checked={isActive === false}
                onChange={() =>
                  setValue("is_active", false, {
                    shouldValidate: true,
                  })
                }
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-blue-600"
              />

              <div className="space-y-2">
                <span className="text-base text-[#03152B]">Inactive</span>

                <p className="text-xs leading-6 text-[#64748B]">
                  Banner will be hidden from the website.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Second row: Banner Image */}
      <div className="rounded-xl border border-[#D7DFEA] bg-white p-5">
        <ImageUpload
          label="Banner Image"
          error={errors.image?.message}
          onChange={(file) => {
            console.log("Selected image:", file);

            setValue("image", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          {banner ? "Update Banner" : "Save Banner"}
        </Button>
      </div>
    </form>
  );
}
