import { RoleType } from "../enums";
import { z } from "zod";

export const LoginBody = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	role: z.enum(Object.values(RoleType)),
});
