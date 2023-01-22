import { TRPCError } from "@trpc/server";
import { RegisterBody, RoleType } from "@trpc-poc/contracts";
import { z } from "zod";
import { hashPassword } from "utils/hash-password";
import { createAccessTokens } from "utils/helpers/tokens/create-access-tokens";
import { Context } from "trpc";

type TRegisterBody = z.infer<typeof RegisterBody>;

export const register = async (body: TRegisterBody, { prisma }: Context) => {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: body.email,
		},
		select: {
			id: true,
		},
	});

	if (existingUser) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Email already exists",
			cause: "emailAlreadyExist",
		});
	}

	const password = await hashPassword(body.password);
	const userInput = { ...body, password };

	const user = await prisma.user.create({
		data: userInput,
	});

	const role = await prisma.role.create({
		data: {
			type: RoleType.user,
			userId: user.id,
		},
		include: {
			user: true,
		},
	});

	const { jwtAccessToken, refreshToken } = await createAccessTokens(
		user,
		RoleType.user
	);

	return {
		role,
		jwtAccessToken,
		refreshToken,
	};
};
