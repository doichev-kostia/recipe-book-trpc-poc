import { z } from "zod";
import { RoleType } from "../enums";
import { UserView } from "./user.view";

export const RoleView = z.object({
	id: z.string(),
	type: z.enum(Object.values(RoleType)),
	user: UserView,
});
