import { router } from "../../trpc";
import { protectedProcedure } from "procedures";
import { z } from "zod";
import { EditUserBody, UserView } from "@trpc-poc/contracts";
import { updateUser } from "./procedures/updateUser.procedure";
import { uploadPicture } from "./procedures/uploadPicture.procedure";

export const usersRouter = router({
	getUser: protectedProcedure
		.input(z.string())
		.output(UserView)
		.query(({ input, ctx }) => {
			return ctx.prisma.user.findUniqueOrThrow({
				where: {
					id: input,
				},
			});
		}),
	updateUser: protectedProcedure
		.input(z.object({ id: z.string().uuid(), data: EditUserBody }))
		.output(UserView)
		.mutation(({ input, ctx }) => {
			return updateUser(input.id, input.data, ctx);
		}),
	uploadPicture: protectedProcedure
		.input(z.object({ userId: z.string().uuid(), fileUrl: z.string() }))
		.output(UserView)
		.mutation(({ input, ctx }) => {
			return uploadPicture(input.userId, input.fileUrl, ctx);
		}),
});
