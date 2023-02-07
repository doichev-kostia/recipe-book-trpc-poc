import { Context } from "../../../trpc";

export const uploadPicture = async (
	userId: string,
	fileUrl: string,
	{ prisma }: Context
) => {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			avatarUrl: fileUrl,
		},
	});
};
