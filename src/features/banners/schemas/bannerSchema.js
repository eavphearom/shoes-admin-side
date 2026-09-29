import { z } from "zod";


export const bannerSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),

  subtitle: z
    .string()
    .trim()
    .min(2, "Subtitle must be at least 2 characters")
    .max(160, "Subtitle must not exceed 160 characters"),

  image: z.any().nullable(),

  is_active: z.boolean(),
});
