import { router } from "../../trpc";
import { protectedProcedure, publicProcedure } from "procedures";
import { LoginBody, RegisterBody, RoleView } from "@trpc-poc/contracts";
import { register } from "./procedures/register.procedure";
import { Response } from "express";
import { login } from "./procedures/login.procedure";
import { refreshToken } from "./procedures/refreshToken.procedure";
import { TRPCError } from "@trpc/server";

const setAuthenticationTokens = (
	res: Response,
	jwtAccessToken: string,
	refreshToken: string
) => {
	res.header("x-auth", jwtAccessToken);
	res.header("x-refresh-token", refreshToken);
};

export const authenticationRouter = router({
	register: publicProcedure
		.input(RegisterBody)
		.output(RoleView)
		.mutation(async ({ input, ctx }) => {
			const { jwtAccessToken, refreshToken, role } = await register(
				input,
				ctx
			);
			setAuthenticationTokens(
				ctx.res,
				jwtAccessToken.token,
				refreshToken.value
			);
			return role;
		}),
	login: publicProcedure
		.input(LoginBody)
		.output(RoleView)
		.mutation(async ({ input, ctx }) => {
			const { role, jwtAccessToken, refreshToken } = await login(
				input,
				ctx
			);
			setAuthenticationTokens(
				ctx.res,
				jwtAccessToken.token,
				refreshToken.value
			);
			return role;
		}),
	refreshToken: protectedProcedure.mutation(async ({ ctx }) => {
		if (!ctx.refreshToken) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Invalid refresh token",
				cause: "invalidRefreshToken",
			});
		}

		const { jwtAccessToken } = await refreshToken(
			ctx.tokenData,
			ctx.refreshToken,
			ctx
		);
		setAuthenticationTokens(
			ctx.res,
			jwtAccessToken.token,
			ctx.refreshToken
		);
	}),
});
