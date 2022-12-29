import { AccessTokenData, RoleType, TokenType } from "@trpc-poc/contracts";

import { getEm } from "utils/request-context-manager";
import { createSimpleAccessToken } from "./create-simple-access-token";
import { User } from "entities/user.entity";
import { RefreshToken } from "entities/token/refresh-token.entity";
import { TRPCError } from "@trpc/server";

export const createAccessTokens = async (user: User, roleType: RoleType) => {
	const em = getEm();
	await em.populate(user, ["roles"]);

	const roles = user.roles.toArray().map((r) => r.type);
	const role = user.roles.toArray().find((r) => r.type === roleType);

	if (!role) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "User does not have the specified role",
			cause: "noAccessToRole",
		});
	}

	const accessTokenData: AccessTokenData = {
		userId: user.id,
		role: {
			id: role.id,
			type: role.type,
		},
		roles,
		type: TokenType.access,
	};

	const jwtAccessToken = await createSimpleAccessToken<AccessTokenData>(
		accessTokenData
	);

	// @ts-ignore
	const refreshToken = em.create(RefreshToken, {
		expiresAt: new Date(
			Date.now() + Number(process.env.REFRESH_TOKEN_LIFETIME)
		),
		user: user.id,
	});

	await em.persistAndFlush([refreshToken, user]);

	return {
		user,
		jwtAccessToken,
		refreshToken,
	};
};
