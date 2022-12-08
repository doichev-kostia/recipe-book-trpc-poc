import { TRPCError } from "@trpc/server";
import { RegisterBody, RoleType } from "@trpc-poc/contracts";
import { z } from "zod";

import { getEm } from "utils/request-context-manager.js";
import { hashPassword } from "utils/hash-password.js";
import { createAccessTokens } from "utils/helpers/tokens/create-access-tokens.js";

import { User } from "entities/user.entity.js";
import { Role } from "entities/role.entity.js";

type TRegisterBody = z.infer<typeof RegisterBody>;

export const register = async (body: TRegisterBody) => {
	const em = getEm();

	const existingUser = await em.findOne(User, {
		email: body.email,
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
	// @ts-ignore
	const user = em.create(User, userInput);
	em.persist(user);
	// @ts-ignore
	const role = em.create(Role, { user });
	em.persist(role);
	user.roles.add(role);
	await em.flush();

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
