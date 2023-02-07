import { z } from "zod";

export const UserView = z.object({
	id: z.string().uuid(),
	firstName: z.string().nullish(),
	lastName: z.string().nullish(),
	email: z.string(),
	avatarUrl: z.string().nullish(),
});
