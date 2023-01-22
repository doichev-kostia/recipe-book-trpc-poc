import { AccessTokenData, TokenType } from "@trpc-poc/contracts";
import { Context } from "trpc";
import { TRPCError } from "@trpc/server";
import { createSimpleAccessToken } from "utils/helpers/tokens";

export const refreshToken = async (
	tokenData: AccessTokenData,
	refreshToken: string,
	{ prisma }: Context
) => {
	const token = await prisma.token.findFirst({
		where: {
			type: TokenType.refresh,
			value: refreshToken,
			userId: tokenData.userId,
		},
	});

	if (!token) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid refresh token",
			cause: "invalidRefreshToken",
		});
	}

	const accessTokenData: AccessTokenData = {
		userId: tokenData.userId,
		role: {
			id: tokenData.role.id,
			type: tokenData.role.type,
		},
		roles: tokenData.roles,
		type: TokenType.access,
	};

	const jwtAccessToken = await createSimpleAccessToken<AccessTokenData>(
		accessTokenData
	);

	return {
		jwtAccessToken,
	};
};
