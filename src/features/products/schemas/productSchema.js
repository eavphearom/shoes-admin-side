import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  category: z.string().min(1, "Category is required"),

  brand: z.string().min(1, "Brand is required"),

  status: z.string().min(1, "Status is required"),

  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  images: z.any().optional(),
});
