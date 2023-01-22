import { middleware } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getTokenData } from "./utils/helpers/tokens/getTokenData";
import { AccessTokenData } from "@trpc-poc/contracts";

export const isAuthenticated = middleware(({ next, ctx }) => {
	if (!ctx.accessToken) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}

	return next({
		ctx: {
			// Infers the `session` as non-nullable
			accessToken: ctx.accessToken,
			tokenData: getTokenData<AccessTokenData>(ctx.accessToken),
		},
	});
});
