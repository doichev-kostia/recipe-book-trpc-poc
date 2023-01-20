import { z } from "zod";

export const UserView = z.object({
	firstName: z.string().nullish(),
	lastName: z.string().nullish(),
	email: z.string(),
});
