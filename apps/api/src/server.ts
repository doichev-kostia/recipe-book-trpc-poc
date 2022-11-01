import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import express from "express";
import cors from "cors";

// created for each request
const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const appRouter = t.router({
	getUser: t.procedure.input(z.string()).query((req) => {
		req.input; // string
		return { id: req.input, name: "Bilbo" };
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();
app.use(
	cors({
		origin: true,
	})
);
app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);
app.listen(4000, () => {
	console.log("Listening on http://localhost:4000/trpc");
});
