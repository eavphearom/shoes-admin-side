import { z } from "zod";

export const colorSchema = z.object({
  name: z
    .string()
    .min(1, "Color name is required")
    .min(2, "Color name must be at least 2 characters"),

  colorCode: z
    .string()
    .min(1, "Color code is required")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color code must be a valid hex color"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});
