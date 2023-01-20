import { router } from "../../trpc";
import { publicProcedure } from "procedures";
import { z } from "zod";
import { UserView } from "@trpc-poc/contracts";

export const usersRouter = router({
	getUser: publicProcedure
		.input(z.string())
		.output(UserView)
		.query(({ input, ctx }) => {
			return ctx.prisma.user.findUniqueOrThrow({
				where: {
					id: input,
				},
			});
		}),
});
