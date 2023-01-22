import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "@trpc-poc/database";

// created for each request
export const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const accessToken = req.headers["x-auth"] as string | undefined;
	const refreshToken = req.headers["x-refresh-token"] as string | undefined;

	return {
		res,
		accessToken,
		refreshToken,
		prisma,
	};
};
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

// We explicitly export the methods we use here
// This allows us to create reusable & protected base procedures
export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;
