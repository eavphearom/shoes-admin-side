import { z } from "zod";

export const bannerSchema = z.object({
  title: z
    .string()
    .min(1, "Banner title is required")
    .min(2, "Banner title must be at least 2 characters"),

  subtitle: z
    .string()
    .max(160, "Subtitle must not exceed 160 characters")
    .optional(),

  placement: z.string().min(1, "Placement is required"),

  link: z.string().optional(),

  status: z.string().min(1, "Status is required"),

  image: z.any().optional(),
});
