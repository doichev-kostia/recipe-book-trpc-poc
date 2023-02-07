import { Context } from "trpc";
import { EditUserBody } from "@trpc-poc/contracts";
import { z } from "zod";

export const updateUser = (
	id: string,
	data: z.infer<typeof EditUserBody>,
	{ prisma }: Context
) => {
	return prisma.user.update({
		where: {
			id,
		},
		data,
	});
};
