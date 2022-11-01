import { z } from "zod";

export const RegisterBody = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
