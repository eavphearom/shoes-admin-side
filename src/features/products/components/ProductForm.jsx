import { zodResolver } from "@hookform/resolvers/zod";
import { Box, ChevronRight, Home, Package, Plus, Save } from "lucide-react";
import { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { productSchema } from "../schemas/productSchema";
import {
  brandOptions,
  categoryOptions,
  formValues,
  newVariant,
} from "../productFormModel";
import VariantForm from "./VariantForm";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [initial] = useState(() => formValues(product));
  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initial,
    shouldFocusError: false,
  });
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
    keyName: "formKey",
  });
  const [expanded, setExpanded] = useState(
    () => new Set(initial.variants.slice(0, 1).map((v) => v.clientId)),
  );
  const [removing, setRemoving] = useState(null);
  const locked = useRef(false);
  const status = useWatch({ control, name: "status" });
  const heading = product ? "Update Product" : "Create Product";
  const addVariant = () => {
    const variant = newVariant(fields.length === 0);
    append(variant, { shouldFocus: false });
    setExpanded((current) => new Set([...current, variant.clientId]));
  };
  const setDefault = (index) =>
    getValues("variants").forEach((_, i) =>
      setValue("variants." + i + ".is_default", i === index, {
        shouldDirty: true,
      }),
    );
  const confirmRemove = () => {
    const variants = getValues("variants");
    const index = variants.findIndex((v) => v.clientId === removing);
    if (index < 0) return setRemoving(null);
    const wasDefault = variants[index].is_default;
    remove(index);
    if (wasDefault && variants.length > 1)
      setValue("variants.0.is_default", true, { shouldDirty: true });
    setRemoving(null);
  };
  async function save(values) {
    if (locked.current) return;
    locked.current = true;
    try {
      await onSubmit(values);
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          error.message ||
          "Unable to save product. Please try again.",
      });
    } finally {
      locked.current = false;
    }
  }
  const invalid = () => {
    setExpanded(new Set(getValues("variants").map((v) => v.clientId)));
  };
  const optionsWithCurrent = (options, value) =>
    value && !options.some((o) => o.value === value)
      ? [...options, { value, label: value }]
      : options;

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={(event) => handleSubmit(save, invalid)(event)}
        className="min-w-0 space-y-4 text-[#03152B]"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#587294]"
            >
              <Link to="/" aria-label="Dashboard">
                <Home size={15} />
              </Link>
              <Link to="/products">Products</Link>
              <ChevronRight size={13} />
              <span className="font-medium text-[#03152B]">{heading}</span>
            </nav>
            <h1 className="text-2xl font-semibold">{heading}</h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Add product information and manage variants, images and stock.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 !bg-[#f67818] hover:!bg-[#E96400]"
            >
              <Save size={16} />
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>
        {errors.root && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {errors.root.message}
          </p>
        )}
        {!!Object.keys(errors).length && !errors.root && (
          <p role="alert" className="text-sm text-red-600">
            Please check the highlighted fields before saving.
          </p>
        )}
        <fieldset
          disabled={isSubmitting}
          className="min-w-0 space-y-4 disabled:opacity-70"
        >
          <section className="grid min-w-0 gap-5 rounded-lg border border-[#ffffff] bg-white p-4 xl:grid-cols-[minmax(0,1fr)_250px]">
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-[#fbeada] p-2 text-[#fb670b]">
                  <Package size={21} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">General Information</h2>
                  <p className="text-xs text-[#64748B]">
                    Basic product details
                  </p>
                </div>
              </div>
              <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Input
                  label="Code"
                  readOnly={!!product}
                  {...register("code")}
                  error={errors.code?.message}
                />
                <Input
                  label="Product Name *"
                  {...register("name")}
                  error={errors.name?.message}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Category *"
                      options={optionsWithCurrent(categoryOptions, field.value)}
                      error={errors.category?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="brand"
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Brand *"
                      options={optionsWithCurrent(brandOptions, field.value)}
                      error={errors.brand?.message}
                    />
                  )}
                />
              </div>
              <label
                htmlFor="product-description"
                className="mb-1 mt-4 block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="product-description"
                {...register("description")}
                rows={3}
                className="w-full resize-y rounded-lg border border-[#D7DFEA] p-3 text-sm outline-none focus:border-[#267BFA] focus:ring-2 focus:ring-blue-100"
              />
              {errors.description && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="overflow-hidden rounded-lg border border-[#D7E2EF]">
              <h2 className="flex items-center gap-2 border-b border-[#E5EAF1] bg-[#F5F8FC] p-3 text-sm font-semibold">
                <Box size={18} />
                Product Status
              </h2>
              <div className="space-y-4 p-3">
                {[
                  "Active",
                  "Inactive",
                  ...(initial.status === "Draft" ? ["Draft"] : []),
                ].map((value) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-start gap-3 text-sm"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("status")}
                      className="mt-1 accent-[#267BFA]"
                    />
                    <span>
                      <span className="flex items-center gap-2">
                        {value}
                        {status === value && (
                          <span
                            className={
                              "rounded-full px-2 py-0.5 text-xs " +
                              (value === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-50 text-red-600")
                            }
                          >
                            {value}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#64748B]">
                        {value === "Active"
                          ? "Product will be visible on the website."
                          : "Product will be hidden on the website."}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>
          <section className="min-w-0 rounded-lg border border-[#D7E2EF] bg-white p-3 sm:p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#FFF0DC] p-2 text-[#E96400]">
                  <Package size={21} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">Variants</h2>
                  <p className="mt-0.5 text-xs leading-5 text-[#64748B]">
                    Add different colors with their own images, cost, price and
                    stock.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-[#fa8c26] px-3 py-2 text-sm font-medium text-[#fa8c26] hover:bg-[#fdf8f4]"
              >
                <Plus size={17} />
                New Variant
              </button>
            </div>
            {(errors.variants?.message || errors.variants?.root?.message) && (
              <p className="mb-3 text-sm text-red-600">
                {errors.variants.message || errors.variants.root.message}
              </p>
            )}
            {!fields.length && (
              <p className="py-5 text-sm text-[#64748B]">
                No variant details are available. Add a variant to continue.
              </p>
            )}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <VariantForm
                  key={field.formKey}
                  index={index}
                  expanded={expanded.has(field.clientId)}
                  onToggle={() =>
                    setExpanded((current) => {
                      const next = new Set(current);
                      if (next.has(field.clientId)) next.delete(field.clientId);
                      else next.add(field.clientId);
                      return next;
                    })
                  }
                  onDefault={() => setDefault(index)}
                  onRemove={() => setRemoving(field.clientId)}
                />
              ))}
            </div>
          </section>
        </fieldset>
        <div className="sticky bottom-0 z-10 flex justify-end gap-3 border-t border-[#D7E2EF] bg-white p-3 sm:hidden">
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 !bg-[#E96400] hover:!bg-[#E96400]"
          >
            <Save size={16} />
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
      <ConfirmModal
        isOpen={removing !== null}
        onClose={() => setRemoving(null)}
        onConfirm={confirmRemove}
        title="Remove variant?"
        message="Remove this color, its images and size stock from the product? Changes take effect when you save."
      />
    </FormProvider>
  );
}
