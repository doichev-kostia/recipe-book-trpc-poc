import { z } from "zod";
import { RoleType } from "../enums/role-type";
import { UserView } from "./user.view";

export const RoleView = z.object({
	id: z.string(),
	type: z.nativeEnum(RoleType),
	user: UserView,
});
