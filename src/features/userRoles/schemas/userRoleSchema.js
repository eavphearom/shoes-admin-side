import { z } from "zod";

export const userRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
});
