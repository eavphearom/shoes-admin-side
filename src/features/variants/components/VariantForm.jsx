import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImagePlus,
  Info,
  PackagePlus,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import MultiImageUpload from "../../../components/ui/MultiImageUpload";
import Select from "../../../components/ui/Select";
import { variantSchema } from "../schemas/variantSchema";

const productOptions = [
  { value: "Air Max Pulse", label: "Air Max Pulse" },
  { value: "Ultraboost Light", label: "Ultraboost Light" },
  { value: "RS-X Toys", label: "RS-X Toys" },
];

const colorOptions = [
  { value: "Midnight Navy", label: "Midnight Navy", colorCode: "#1E2B3F" },
  { value: "Royal Blue", label: "Royal Blue", colorCode: "#F97316" },
  { value: "Cool Gray", label: "Cool Gray", colorCode: "#64748B" },
];

const sizeOptions = [
  "US 5",
  "US 6",
  "US 7",
  "US 8",
  "US 9",
  "US 10",
  "US 11",
  "US 12",
].map((size) => ({
  value: size,
  label: size,
}));



const defaultValues = {
  product: "",
  color: "",
  size: "",
  sku: "",
  price: 0,
  stock: 0,
  status: "Active",
  description: "",
};

const createStockRow = (values = {}) => ({
  id: Date.now() + Math.random(),
  color: "",
  size: "",
  stock: 0,
  lowStock: 0,
  ...values,
});

export default function VariantForm({ variant = null, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues,
  });

  const formValues = useWatch({ control });
  const [stockRows, setStockRows] = useState(() => [
    createStockRow({
      color: variant?.color || "",
      size: variant?.size || "",
      stock: variant?.stock || 0,
      lowStock: 0,
    }),
  ]);
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    if (variant) {
      reset({
        product: variant.product,
        color: variant.color,
        size: variant.size,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        status: variant.status,
        description: variant.description,
      });
    } else {
      reset(defaultValues);
    }
  }, [variant, reset]);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleStockChange = (rowId, field, value) => {
    setStockRows((currentRows) =>
      currentRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    );

    if (stockRows[0]?.id === rowId && ["color", "size", "stock"].includes(field)) {
      setValue(field, value, { shouldValidate: true });
    }
  };

  const handleAddStockRow = () => {
    setStockRows((currentRows) => [...currentRows, createStockRow()]);
  };

  const handleDeleteStockRow = (rowId) => {
    setStockRows((currentRows) => {
      const nextRows = currentRows.filter((row) => row.id !== rowId);
      const finalRows = nextRows.length > 0 ? nextRows : [createStockRow()];
      const firstRow = finalRows[0];

      setValue("color", firstRow.color, { shouldValidate: true });
      setValue("size", firstRow.size, { shouldValidate: true });
      setValue("stock", firstRow.stock, { shouldValidate: true });

      return finalRows;
    });
    setContextMenu(null);
  };

  const handleContextMenu = (event, rowId) => {
    event.preventDefault();
    setContextMenu({
      rowId,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-m-4 bg-[#F7F9FC]">
      <div className="space-y-4 p-4">
        <div className="flex flex-col justify-between gap-3 border-b border-[#E5EAF1] pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
              <span>Dashboard</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="font-semibold text-[#03152B]">
                {variant ? "Edit Variant" : "Create Variant"}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#03152B]">
              {variant ? "Edit Variant" : "Create Variant"}
            </h3>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="rounded-lg border border-[#D7DFEA] bg-white p-4 shadow-sm">
            <CardTitle
              icon={<Info size={16} />}
              title="Variant Information"
              description="Enter variant details. Each variant can have stock based on color and size."
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Select
                label="Product"
                options={productOptions}
                placeholder="Select product"
                error={errors.product?.message}
                {...register("product")}
              />

              <Input
                label="Variant SKU Prefix"
                placeholder="AF1"
                error={errors.sku?.message}
                {...register("sku")}
              />

              <Input
                label="Price (USD)"
                type="number"
                min="0"
                step="0.01"
                placeholder="100.00"
                error={errors.price?.message}
                {...register("price")}
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Enter description"
                className="min-h-24 w-full rounded-lg border border-[#D7DFEA] bg-white p-3 text-sm text-[#03152B] outline-none placeholder:text-[#8A98AA] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-[#D7DFEA] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <CardTitle
                icon={<ImagePlus size={16} />}
                title="Variant Images"
                compact
              />
              <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-semibold text-[#F97316]">
                Max 5 images
              </span>
            </div>

            <MultiImageUpload label="" maxFiles={5} enablePrimary />
          </section>
        </div>

        <section className="rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-[#E5EAF1] p-4 sm:flex-row sm:items-center">
            <CardTitle
              icon={<PackagePlus size={16} />}
              title="Variant Stock"
              description="Add stock for this variant by selecting color and size."
            />
            <Button
              type="button"
              onClick={handleAddStockRow}
              className="h-9 gap-2 px-3"
            >
              <Plus size={15} />
              Add Stock
            </Button>
          </div>

          <input type="hidden" {...register("color")} />
          <input type="hidden" {...register("size")} />
          <input type="hidden" {...register("stock")} />

          <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
                  <th className="px-2 py-3">Color</th>
                  <th className="px-2 py-3">Size</th>
                  <th className="px-2 py-3">Price (USD)</th>
                  <th className="px-2 py-3">Stock Qty</th>
                  <th className="px-2 py-3">Low Stock Alert</th>
                </tr>
              </thead>
              <tbody>
                {stockRows.map((row, index) => (
                  <tr
                    key={row.id}
                    onContextMenu={(event) => handleContextMenu(event, row.id)}
                    className="border-b border-[#EEF2F7] text-sm transition last:border-0 hover:bg-[#F8FAFD]"
                  >
                    <td className="px-2 py-3">
                      <Select
                        options={colorOptions}
                        value={row.color}
                        onChange={(event) =>
                          handleStockChange(row.id, "color", event.target.value)
                        }
                        placeholder="Select color"
                        error={index === 0 ? errors.color?.message : undefined}
                      />
                    </td>
                    <td className="px-2 py-3">
                      <Select
                        options={sizeOptions}
                        value={row.size}
                        onChange={(event) =>
                          handleStockChange(row.id, "size", event.target.value)
                        }
                        placeholder="Select size"
                        error={index === 0 ? errors.size?.message : undefined}
                      />
                    </td>

                    <td className="px-2 py-3">
                      <input
                        type="text"
                        value={formatPrice(formValues.price)}
                        readOnly
                        className="w-full rounded-lg border border-[#D7DFEA] bg-[#F8FAFD] px-3 py-2 text-sm font-semibold text-[#03152B] outline-none"
                      />
                    </td>
                    <td className="px-2 py-3">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={row.stock}
                        onChange={(event) =>
                          handleStockChange(row.id, "stock", event.target.value)
                        }
                        placeholder="0"
                        error={index === 0 ? errors.stock?.message : undefined}
                      />
                    </td>
                    <td className="px-1 py-3">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={row.lowStock}
                        onChange={(event) =>
                          handleStockChange(
                            row.id,
                            "lowStock",
                            event.target.value,
                          )
                        }
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                onClick={() => handleDeleteStockRow(contextMenu.rowId)}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </section>
        <div className=" flex justify-end gap-3 bg-white border-[#E5EAF1] px-4 py-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} className="gap-2">
            <Save size={15} />
            Save Variant
          </Button>
        </div>
      </div>
    </form>
  );
}

function CardTitle({ icon, title, description, compact = false }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFF7ED] text-[#F97316]">
          {icon}
        </span>
        <h4 className="text-base font-bold text-[#03152B]">{title}</h4>
      </div>
      {description && (
        <p className={`text-sm text-[#64748B] ${compact ? "mt-1" : "mt-3"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function formatPrice(price) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return "0.00";
  }

  return numericPrice.toFixed(2);
}
