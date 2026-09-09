import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .min(2, "Brand name must be at least 2 characters"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  logo: z.any().optional(),
});
