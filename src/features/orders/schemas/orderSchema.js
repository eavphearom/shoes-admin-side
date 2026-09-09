import { z } from "zod";

export const orderSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  status: z.string().min(1, "Status is required"),
  payment: z.string().min(1, "Payment status is required"),
  total: z.coerce.number().min(0, "Total must be greater than or equal to 0"),
  items: z.coerce
    .number()
    .int("Items must be a whole number")
    .min(1, "Items is required"),
  note: z.string().max(500, "Note must not exceed 500 characters").optional(),
});
