import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Email must be valid"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.string().min(1, "Status is required"),
  address: z.string().max(500, "Address must not exceed 500 characters").optional(),
});
