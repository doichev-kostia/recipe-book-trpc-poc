import { z } from "zod";

export const UserView = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
});
