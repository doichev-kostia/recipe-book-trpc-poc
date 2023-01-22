import { LoginBody } from "@trpc-poc/contracts";
import { z } from "zod";
import { Context } from "trpc";
import { TRPCError } from "@trpc/server";
import { createAccessTokens } from "utils/helpers/tokens/create-access-tokens";

type TLoginBody = z.infer<typeof LoginBody>;

export const login = async (body: TLoginBody, { prisma }: Context) => {
	const role = await prisma.role.findFirst({
		where: {
			type: body.role,
			user: {
				email: body.email,
			},
		},
		include: {
			user: true,
		},
	});

	if (!role) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid credentials",
			cause: "invalidCredentials",
		});
	}

	const { jwtAccessToken, refreshToken } = await createAccessTokens(
		role.user,
		body.role
	);

	return {
		role,
		jwtAccessToken,
		refreshToken,
	};
};
