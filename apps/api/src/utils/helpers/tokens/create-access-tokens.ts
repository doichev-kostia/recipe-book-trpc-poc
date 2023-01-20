import { AccessTokenData, RoleType, TokenType } from "@trpc-poc/contracts";
import { prisma, Role, User } from "@trpc-poc/database";
import { createSimpleAccessToken } from "./create-simple-access-token";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";

export const createAccessTokens = async (user: User, roleType: RoleType) => {
	const u = await prisma.user.findUniqueOrThrow({
		where: {
			id: user.id,
		},
		include: {
			roles: true,
		},
	});

	let role: Role | undefined;
	const roles = u.roles.map((r) => {
		if (r.type === roleType) {
			role = r;
		}
		return r.type;
	});

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

	const refreshToken = await prisma.token.create({
		data: {
			value: crypto.randomBytes(120).toString("hex").substring(120),
			type: TokenType.refresh,
			expiresAt: new Date(
				Date.now() + Number(process.env.REFRESH_TOKEN_LIFETIME)
			),
			userId: user.id,
		},
	});

	return {
		user,
		jwtAccessToken,
		refreshToken,
	};
};
