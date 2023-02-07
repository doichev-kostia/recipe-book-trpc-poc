import { z } from "zod";

export const EditUserBody = z.object({
	firstName: z.string().min(2).max(255).optional(),
	lastName: z.string().min(2).max(255).optional(),
	email: z.string().email().optional(),
});
