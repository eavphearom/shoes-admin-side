import { z } from "zod";

export const variantSchema = z.object({
  product: z.string().min(1, "Product is required"),

  color: z.string().min(1, "Color is required"),

  size: z.string().min(1, "Size is required"),

  sku: z.string().min(1, "SKU is required"),

  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock must be greater than or equal to 0"),

  status: z.string().min(1, "Status is required"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});
