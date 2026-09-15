import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { colorSchema } from "../schemas/colorSchema";

export default function ColorForm({ color = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      colorCode: "#F97316",
      description: "",
    },
  });

  const selectedColor = useWatch({
    control,
    name: "colorCode",
  });
  const pickerColor = /^#[0-9A-Fa-f]{6}$/.test(selectedColor)
    ? selectedColor
    : "#F97316";

  const handleColorCodeChange = (value) => {
    const nextValue = value.startsWith("#") ? value : `#${value}`;

    return nextValue;
  };

  useEffect(() => {
    if (color) {
      reset({
        name: color.name,
        colorCode: color.colorCode,
        description: color.description,
      });
    } else {
      reset({
        name: "",
        colorCode: "#F97316",
        description: "",
      });
    }
  }, [color, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Color Name"
        placeholder="Enter color name"
        error={errors.name?.message}
        {...register("name")}
      />

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#03152B]">
          Color Code
        </label>
        <Controller
          name="colorCode"
          control={control}
          render={({ field }) => (
            <div className="flex gap-3">
              <input
                type="color"
                value={pickerColor}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-[#D7DFEA] bg-white p-1"
              />
              <div className="flex-1">
                <Input
                  name={field.name}
                  placeholder="#F97316"
                  value={field.value || ""}
                  onBlur={field.onBlur}
                  onChange={(e) =>
                    field.onChange(handleColorCodeChange(e.target.value))
                  }
                />
              </div>
            </div>
          )}
        />
        {errors.colorCode && (
          <p className="mt-1 text-sm text-red-500">
            {errors.colorCode.message}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-[#64748B]">
          <span
            className="h-4 w-4 rounded-full border border-[#D7DFEA]"
            style={{ backgroundColor: pickerColor }}
          />
          Selected color: {selectedColor}
        </div>
      </div>

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
          Save Color
        </Button>
      </div>
    </form>
  );
}
