import { z } from "zod";

const required = (label) => z.string().trim().min(1, label + " is required");
const amount = (label, integer = false) => z.union([z.string(), z.number()])
  .refine(value => String(value).trim() !== "" && Number.isFinite(Number(value)) && Number(value) >= 0 && (!integer || Number.isInteger(Number(value))),
    label + (integer ? " must be a non-negative integer" : " must be a non-negative number"))
  .transform(Number);
const stockSchema = z.object({
  size: required("Size"), stock: amount("Stock quantity", true), lowStock: amount("Low-stock alert", true),
}).passthrough();
const variantSchema = z.object({
  code: required("Variant code"), color: required("Color"),
  cost: amount("Cost"), price: amount("Selling price"), is_default: z.boolean(),
  images: z.array(z.any()).max(5, "Use up to 5 images"),
  stocks: z.array(stockSchema).min(1, "Add at least one size"),
}).passthrough().superRefine((variant, ctx) => {
  const sizes = new Set();
  variant.stocks.forEach((row, i) => {
    if (sizes.has(row.size)) ctx.addIssue({ code: "custom", path: ["stocks", i, "size"], message: "This size is already added" });
    sizes.add(row.size);
  });
  if (variant.images.length && variant.images.filter(image => image.is_primary).length !== 1)
    ctx.addIssue({ code: "custom", path: ["images"], message: "Choose exactly one primary image" });
});
export const productSchema = z.object({
  name: required("Product name").min(2, "Use at least 2 characters"),
  code: required("Product code"), category: required("Category"), brand: required("Brand"),
  status: z.enum(["Active", "Inactive", "Draft"]),
  description: z.string().max(1000, "Description must not exceed 1000 characters"),
  variants: z.array(variantSchema).min(1, "Add at least one variant"),
}).passthrough().superRefine((product, ctx) => {
  if (product.variants.filter(v => v.is_default).length !== 1)
    ctx.addIssue({ code: "custom", path: ["variants"], message: "Select exactly one default variant" });
  for (const field of ["color", "code"]) {
    const seen = new Set();
    product.variants.forEach((variant, i) => {
      const value = variant[field].toLowerCase();
      if (seen.has(value)) ctx.addIssue({ code: "custom", path: ["variants", i, field], message: "Each variant needs a unique " + field });
      seen.add(value);
    });
  }
});
