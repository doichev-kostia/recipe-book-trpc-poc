import { z } from "zod";

export const UserView = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string(),
});
