import {
  ChevronDown,
  Database,
  ImagePlus,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import MultiImageUpload, {
  UploadImagePreview,
} from "../../../components/ui/MultiImageUpload";
import { colorOptions } from "../productFormModel";
import VariantStock from "./VariantStock";

export default function VariantForm({
  index,
  expanded,
  onToggle,
  onRemove,
  onDefault,
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const name = "variants." + index;
  const variant = useWatch({ control, name });
  const all = useWatch({ control, name: "variants" }) || [];
  const error = errors.variants?.[index];
  const primary =
    variant.images?.find((image) => image.is_primary) || variant.images?.[0];
  const stocks = variant.stocks || [];
  const panelId = "variant-" + variant.clientId;
  return (
    <article
      className={
        "min-w-0 overflow-hidden rounded-lg border " +
        (expanded
          ? "border-[#ffffff] bg-[#F8FBFF]"
          : "border-[#DDE6F0] bg-white")
      }
    >
      <div className="flex flex-wrap items-center gap-3 p-3">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-w-[150px] flex-1 cursor-pointer items-center gap-3 text-left"
        >
          <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F1F4F7]">
            <UploadImagePreview
              image={primary}
              className="h-full w-full object-contain"
            />
          </span>
          <span>
            <span className="block text-sm font-semibold">
              Variant {index + 1}
            </span>
            <span className="block text-xs text-[#64748B]">
              {variant.color || "Select color"}
            </span>
          </span>
        </button>
        {variant.is_default ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DC] px-2.5 py-1 text-xs font-medium text-[#E96400]">
            <Star size={13} fill="currentColor" />
            Default Display
          </span>
        ) : (
          <button
            type="button"
            onClick={onDefault}
            className="cursor-pointer rounded-md border border-[#D7DFEA] bg-white px-2.5 py-1 text-xs text-[#405C80]"
          >
            Set Default
          </button>
        )}
        {!expanded && (
          <p className="order-last w-full text-xs leading-6 text-[#536B8B] lg:order-none lg:w-auto">
            Cost {"$" + Number(variant.cost || 0).toFixed(2)} / Price{" "}
            {"$" + Number(variant.price || 0).toFixed(2)} / {stocks.length}{" "}
            sizes /{" "}
            {stocks.reduce((sum, row) => sum + Number(row.stock || 0), 0)} pairs
          </p>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={
            (expanded ? "Collapse" : "Expand") + " variant " + (index + 1)
          }
          className="cursor-pointer rounded p-2 text-[#405C80]"
        >
          <ChevronDown
            size={18}
            className={
              "transition-transform motion-reduce:transition-none " +
              (expanded ? "rotate-180" : "")
            }
          />
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={"Remove variant " + (index + 1)}
          className="cursor-pointer rounded p-2 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
      {error && !expanded && (
        <p className="px-4 pb-3 text-xs text-red-600">
          Check the required fields in this variant.
        </p>
      )}
      <div
        id={panelId}
        inert={!expanded ? true : undefined}
        className={
          "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none " +
          (expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="min-h-0 overflow-hidden">
          <div className="m-2 mt-0 grid min-w-0 divide-y divide-[#E5EAF1] rounded-lg border border-[#E5EAF1] bg-white lg:grid-cols-2 lg:divide-y-0 xl:grid-cols-[0.9fr_1fr_1.1fr]">
            <section className="min-w-0 p-4 lg:border-r lg:border-[#E5EAF1]">
              <Heading icon={Tag} title="Variant Information" />
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Variant Code *"
                  {...register(name + ".code")}
                  readOnly={variant.is_default}
                  error={error?.code?.message}
                />
                <Controller
                  control={control}
                  name={name + ".color"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Color *"
                      options={[
                        ...colorOptions,
                        ...(variant.color &&
                        !colorOptions.some((c) => c.value === variant.color)
                          ? [{ value: variant.color, label: variant.color }]
                          : []),
                      ].filter(
                        (c) =>
                          c.value === variant.color ||
                          !all.some((v) => v.color === c.value),
                      )}
                      error={error?.color?.message}
                    />
                  )}
                />
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  label="Cost (USD) *"
                  {...register(name + ".cost")}
                  error={error?.cost?.message}
                />
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  label="Selling Price (USD) *"
                  {...register(name + ".price")}
                  error={error?.price?.message}
                />
              </div>
            </section>
            <section className="min-w-0 p-4 xl:border-r xl:border-[#E5EAF1]">
              <Heading
                icon={ImagePlus}
                title="Variant Images"
                description="Upload images and set one as primary."
              />
              <div className="mt-4">
                <Controller
                  control={control}
                  name={name + ".images"}
                  render={({ field }) => (
                    <MultiImageUpload
                      label=""
                      layout="compact"
                      enablePrimary
                      value={field.value}
                      onChange={field.onChange}
                      error={error?.images?.message}
                    />
                  )}
                />
              </div>
            </section>
            <section className="min-w-0 p-4 lg:col-span-2 lg:border-t lg:border-[#E5EAF1] xl:col-span-1 xl:border-t-0">
              <Heading
                icon={Database}
                title="Stock by Size"
                description="Manage quantity and low-stock alerts."
              />
              <div className="mt-3">
                <VariantStock index={index} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

function Heading({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF5FF] text-[#267BFA]">
        <Icon size={18} />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs leading-5 text-[#64748B]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
