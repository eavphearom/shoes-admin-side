import { z } from "zod";

export const sizeSchema = z.object({
  name: z.string().min(1, "Size name is required"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});
