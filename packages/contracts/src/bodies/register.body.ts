import { z } from "zod";

export const RegisterBody = z.object({
	firstName: z.string().min(2).max(255).optional(),
	lastName: z.string().min(2).max(255).optional(),
	email: z.string().email(),
	password: z.string().min(8),
});
