import { router } from "../../trpc";
import { publicProcedure } from "procedures";
import { RegisterBody, RoleView } from "@trpc-poc/contracts";
import { register } from "./procedures/register.procedure";
import { Response } from "express";

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
});
