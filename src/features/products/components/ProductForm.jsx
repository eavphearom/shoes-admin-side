import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronUp,
  Image,
  Package,
  Plus,
  Save,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import MultiImageUpload from "../../../components/ui/MultiImageUpload";
import Select from "../../../components/ui/Select";
import { productSchema } from "../schemas/productSchema";

const categoryOptions = [
  { value: "Shoes", label: "Shoes" },
  { value: "Accessories", label: "Accessories" },
  { value: "Clothing", label: "Clothing" },
];

const brandOptions = [
  { value: "Nike", label: "Nike" },
  { value: "Adidas", label: "Adidas" },
  { value: "Puma", label: "Puma" },
];

const colorOptions = [
  { value: "Midnight Navy", label: "Midnight Navy", colorCode: "#1E2B3F" },
  { value: "White", label: "White", colorCode: "#FFFFFF" },
  { value: "Black", label: "Black", colorCode: "#020617" },
  { value: "Red", label: "Red", colorCode: "#DC2626" },
  { value: "Pink", label: "Pink", colorCode: "#EC4899" },
];

const sizeOptions = ["US 5", "US 6", "US 7", "US 8", "US 9"].map((size) => ({
  value: size,
  label: size,
}));

const defaultValues = {
  name: "",
  category: "",
  brand: "",
  status: "Active",
  description: "",
  images: [],
};

const initialColorImageGroups = ["Midnight Navy", "White", "Black"].map(
  (color, index) => ({
    id: color,
    color,
    images: [],
    isOpen: index === 0,
  }),
);

const initialStockRows = [
  {
    id: 1,
    color: "Midnight Navy",
    size: "US 5",
    price: "80.00",
    stock: "10",
    lowStock: "3",
  },
  {
    id: 2,
    color: "White",
    size: "US 6",
    price: "80.00",
    stock: "8",
    lowStock: "2",
  },
  {
    id: 3,
    color: "Black",
    size: "US 7",
    price: "85.00",
    stock: "6",
    lowStock: "2",
  },
];

const getColorMeta = (colorValue) =>
  colorOptions.find((option) => option.value === colorValue) || {
    value: colorValue,
    label: colorValue,
    colorCode: "#CBD5E1",
  };

export default function ProductForm({ product = null, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  const [isVariantOpen, setIsVariantOpen] = useState(true);
  const [variantRows, setVariantRows] = useState(initialStockRows);
  const [colorImageGroups, setColorImageGroups] = useState(initialColorImageGroups);
  const [defaultDisplayColor, setDefaultDisplayColor] = useState("Midnight Navy");
  const [selectedColorToAdd, setSelectedColorToAdd] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const description = useWatch({ control, name: "description" }) || "";

  const stockColorOptions = useMemo(
    () =>
      colorImageGroups.map((group) => {
        const color = getColorMeta(group.color);

        return {
          value: color.value,
          label: color.label,
          colorCode: color.colorCode,
        };
      }),
    [colorImageGroups],
  );

  const addableColorOptions = useMemo(
    () =>
      colorOptions.filter(
        (option) =>
          !colorImageGroups.some((group) => group.color === option.value),
      ),
    [colorImageGroups],
  );

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        brand: product.brand,
        status: product.status,
        description: product.description,
        images: product.images || [],
      });
    } else {
      reset(defaultValues);
    }
  }, [product, reset]);

  useEffect(() => {
    setValue(
      "images",
      colorImageGroups.flatMap((group) => group.images || []),
    );
  }, [colorImageGroups, setValue]);

  const handleFormSubmit = (values) => {
    onSubmit?.({
      ...values,
      defaultDisplayColor,
      colorImages: colorImageGroups,
      variantStock: variantRows,
    });
  };

  const handleVariantRowChange = (rowId, field, value) => {
    setVariantRows((currentRows) =>
      currentRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    );
  };

  const handleAddVariantRow = () => {
    setVariantRows((currentRows) => [
      ...currentRows,
      {
        id: Date.now(),
        color: stockColorOptions[0]?.value || "",
        size: "",
        price: "0.00",
        stock: "0",
        lowStock: "0",
      },
    ]);
  };

  const handleDeleteVariantRow = (rowId) => {
    setVariantRows((currentRows) =>
      currentRows.filter((row) => row.id !== rowId),
    );
    setContextMenu(null);
  };

  const handleAddColorGroup = () => {
    if (!selectedColorToAdd) return;

    setColorImageGroups((currentGroups) => [
      ...currentGroups,
      {
        id: selectedColorToAdd,
        color: selectedColorToAdd,
        images: [],
        isOpen: true,
      },
    ]);
    setDefaultDisplayColor((currentColor) => currentColor || selectedColorToAdd);
    setSelectedColorToAdd("");
  };

  const handleRemoveColorGroup = (colorValue) => {
    setColorImageGroups((currentGroups) => {
      const nextGroups = currentGroups.filter((group) => group.color !== colorValue);

      setDefaultDisplayColor((currentColor) => {
        if (currentColor !== colorValue) return currentColor;

        return nextGroups[0]?.color || "";
      });

      return nextGroups;
    });

    setVariantRows((currentRows) =>
      currentRows.filter((row) => row.color !== colorValue),
    );
  };

  const handleColorImagesChange = (colorValue, files) => {
    setColorImageGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.color === colorValue ? { ...group, images: files } : group,
      ),
    );
  };

  const handleToggleColorGroup = (colorValue) => {
    setColorImageGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.color === colorValue
          ? { ...group, isOpen: !group.isOpen }
          : group,
      ),
    );
  };

  const handleContextMenu = (event, rowId) => {
    event.preventDefault();
    setContextMenu({
      rowId,
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="-m-4 bg-[#F7F9FC]">
      <div className="space-y-4 p-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#64748B]">
              <span>Dashboard</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="font-semibold text-[#03152B]">
                {product ? "Edit Product" : "Create Product"}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#03152B]">
              {product ? "Edit Product" : "Create Product"}
            </h3>
            <p className="mt-1 text-sm text-[#64748B]">
              Add a new product to your store. You can also create the first
              variant and stock.
            </p>
          </div>
        </div>

        <section className="rounded-lg border border-[#D7DFEA] bg-white p-4 shadow-sm">
          <CardTitle
            icon={<Package size={16} />}
            title="Product Information"
            description="Enter the basic information about this product."
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <RequiredInput
              label="Product Name"
              placeholder="Enter product name"
              error={errors.name?.message}
              registration={register("name")}
            />

            <Input
              label="Product Code (SKU)"
              placeholder="Enter product code"
            />

            <Select
              label="Category"
              options={categoryOptions}
              placeholder="Select category"
              error={errors.category?.message}
              {...register("category")}
            />

            <Select
              label="Brand"
              options={brandOptions}
              placeholder="Select brand"
              error={errors.brand?.message}
              {...register("brand")}
            />

            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <span className="text-xs font-medium text-[#64748B]">
                  {description.length} / 1000
                </span>
              </div>
              <textarea
                {...register("description")}
                placeholder="Enter product description (optional)"
                rows={4}
                className="w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm text-[#03152B] outline-none placeholder:text-[#8A98AA] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
          <div className="flex items-start justify-between gap-3 p-4">
            <CardTitle
              icon={<Tag size={16} />}
              title={
                <>
                  Variant Information{" "}
                  <span className="font-medium text-[#64748B]">(Optional)</span>
                </>
              }
              description="Add the first variant for this product. You can always add more variants later."
            />
            <button
              type="button"
              onClick={() => setIsVariantOpen((current) => !current)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#D7DFEA] bg-white text-[#03152B] transition hover:bg-[#F7F9FC]"
              aria-label={
                isVariantOpen
                  ? "Hide variant information"
                  : "Show variant information"
              }
            >
              {isVariantOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              isVariantOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-5 border-t border-[#E5EAF1] p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Variant SKU Prefix" placeholder="e.g. AF1" />
                  <Input
                    label="Cost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <section className="rounded-lg border border-[#E5EAF1] bg-[#FBFCFE]">
                  <div className="flex flex-col gap-4 border-b border-[#E5EAF1] p-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <CardTitle
                        icon={<Image size={16} />}
                        title="Colors & Images"
                        description="Add colors first, then upload images and choose the primary image for each color."
                      />
                    </div>

                    <div className="grid gap-2 sm:grid-cols-[220px_auto]">
                      <Select
                        options={addableColorOptions}
                        value={selectedColorToAdd}
                        onChange={(event) =>
                          setSelectedColorToAdd(event.target.value)
                        }
                        placeholder={
                          addableColorOptions.length
                            ? "Select color"
                            : "All colors added"
                        }
                        disabled={!addableColorOptions.length}
                      />
                      <Button
                        type="button"
                        onClick={handleAddColorGroup}
                        disabled={!selectedColorToAdd}
                        className="h-9 gap-2 px-3"
                      >
                        <Plus size={15} />
                        Add Color
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 p-4">
                    {colorImageGroups.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-[#CBD5E1] bg-white p-6 text-center">
                        <p className="text-sm font-semibold text-[#03152B]">
                          No colors added yet.
                        </p>
                        <p className="mt-1 text-xs text-[#64748B]">
                          Add at least one color before creating stock rows.
                        </p>
                      </div>
                    ) : (
                      colorImageGroups.map((group) => {
                        const color = getColorMeta(group.color);
                        const stockRowsCount = variantRows.filter(
                          (row) => row.color === group.color,
                        ).length;
                        const isDefaultColor = defaultDisplayColor === group.color;

                        return (
                          <ColorImageGroup
                            key={group.id}
                            group={group}
                            color={color}
                            stockRowsCount={stockRowsCount}
                            isDefaultColor={isDefaultColor}
                            onToggle={() => handleToggleColorGroup(group.color)}
                            onSetDefault={() => setDefaultDisplayColor(group.color)}
                            onRemove={() => handleRemoveColorGroup(group.color)}
                            onImagesChange={(files) =>
                              handleColorImagesChange(group.color, files)
                            }
                          />
                        );
                      })
                    )}
                  </div>
                </section>

                <div>
                  <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="text-base font-bold text-[#03152B]">
                        Variant Stock
                      </h4>
                      <p className="mt-1 text-sm text-[#64748B]">
                        Stock color can only use colors added in Colors & Images.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddVariantRow}
                      disabled={!stockColorOptions.length}
                      className="h-9 gap-2 px-3"
                    >
                      <Plus size={15} />
                      Add Stock
                    </Button>
                  </div>

                  {stockColorOptions.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#CBD5E1] bg-white p-6 text-center">
                      <p className="text-sm font-semibold text-[#03152B]">
                        Add colors before creating stock rows.
                      </p>
                      <p className="mt-1 text-sm text-[#64748B]">
                        The stock color dropdown will appear after at least one color is added.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-lg border border-[#E5EAF1] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
                      <table className="w-full min-w-[860px]">
                        <thead>
                          <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-xs font-semibold text-[#64748B]">
                            <th className="px-3 py-3">Color</th>
                            <th className="px-3 py-3">Size</th>
                            <th className="px-3 py-3">Price (USD)</th>
                            <th className="px-3 py-3">Stock Qty</th>
                            <th className="px-3 py-3">Low Stock Alert</th>
                          </tr>
                        </thead>
                        <tbody>
                          {variantRows.map((row) => (
                            <tr
                              key={row.id}
                              onContextMenu={(event) =>
                                handleContextMenu(event, row.id)
                              }
                              className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
                            >
                              <td className="px-3 py-2">
                                <Select
                                  options={stockColorOptions}
                                  value={row.color}
                                  onChange={(event) =>
                                    handleVariantRowChange(
                                      row.id,
                                      "color",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="Select color"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Select
                                  options={sizeOptions}
                                  value={row.size}
                                  onChange={(event) =>
                                    handleVariantRowChange(
                                      row.id,
                                      "size",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="Select size"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={row.price}
                                  onChange={(event) =>
                                    handleVariantRowChange(
                                      row.id,
                                      "price",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-[#D7DFEA] bg-white px-3 py-2 text-sm text-[#03152B] outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={row.stock}
                                  onChange={(event) =>
                                    handleVariantRowChange(
                                      row.id,
                                      "stock",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-[#D7DFEA] bg-white px-3 py-2 text-sm text-[#03152B] outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={row.lowStock}
                                  onChange={(event) =>
                                    handleVariantRowChange(
                                      row.id,
                                      "lowStock",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-[#D7DFEA] bg-white px-3 py-2 text-sm text-[#03152B] outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {contextMenu && (
                    <div
                      className="fixed z-[9999] min-w-36 overflow-hidden rounded-lg border border-[#D7DFEA] bg-white py-1 shadow-xl"
                      style={{
                        left: contextMenu.x,
                        top: contextMenu.y,
                      }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteVariantRow(contextMenu.rowId)
                        }
                        className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 border-t border-[#E5EAF1] bg-white px-4 py-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="gap-2"
          >
            <X size={15} />
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} className="gap-2">
            <Save size={15} />
            {product ? "Save Product" : "Create Product"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function ColorImageGroup({
  group,
  color,
  stockRowsCount,
  isDefaultColor,
  onToggle,
  onSetDefault,
  onRemove,
  onImagesChange,
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
        >
          <span
            className="h-5 w-5 shrink-0 rounded-full border border-[#CBD5E1]"
            style={{ backgroundColor: color.colorCode }}
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-[#03152B]">
              {color.label}
            </span>
            <span className="mt-0.5 block text-xs text-[#64748B]">
              {group.images.length} images - {stockRowsCount} stock rows
            </span>
          </span>
          {group.isOpen ? (
            <ChevronUp size={16} className="ml-auto text-[#64748B]" />
          ) : (
            <ChevronDown size={16} className="ml-auto text-[#64748B]" />
          )}
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {isDefaultColor ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#F97316]">
              <Star size={13} fill="currentColor" />
              Default Display
            </span>
          ) : (
            <button
              type="button"
              onClick={onSetDefault}
              className="cursor-pointer rounded-full border border-[#D7DFEA] px-3 py-1 text-xs font-bold text-[#64748B] transition hover:border-[#F97316] hover:text-[#F97316]"
            >
              Set Default
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
            aria-label={`Remove ${color.label}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          group.isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#E5EAF1] p-3">
            <MultiImageUpload
              label={`Images for ${color.label}`}
              maxFiles={5}
              enablePrimary
              layout="inline"
              onChange={onImagesChange}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function CardTitle({ icon, title, description }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7ED] text-[#F97316]">
          {icon}
        </span>
        <h4 className="text-base font-bold text-[#03152B]">{title}</h4>
      </div>
      {description && (
        <p className="mt-2 text-sm text-[#64748B]">{description}</p>
      )}
    </div>
  );
}

function RequiredInput({ label, registration, ...props }) {
  return (
    <Input
      label={
        <span>
          {label} <span className="text-red-500">*</span>
        </span>
      }
      {...props}
      {...registration}
    />
  );
}



