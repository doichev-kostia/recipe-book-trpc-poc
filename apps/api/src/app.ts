import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, mergeRouters } from "./trcp";
import { authenticationRouter } from "./routes/authentication";
import { usersRouter } from "./routes/user";

const appRouter = mergeRouters(authenticationRouter, usersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

export class App {
	public readonly host: Express;
	public readonly port: number;

	constructor() {
		dotenv.config();
		this.port = Number(process.env.PORT) || 4000;
		this.host = express();

		this.initializeMiddlewares();
	}

	public listen(): void {
		this.host.listen(this.port, () => {
			console.info(`=================================`);
			console.info(`======= ENV: ${process.env.NODE_ENV} ========`);
			console.info(`🚀 http://localhost:${this.port}/trpc`);
			console.info(`=================================`);
		});
	}

	private initializeMiddlewares(): void {
		this.host.use(
			cors({
				origin: true,
			})
		);

		this.host.use(
			"/trpc",
			trpcExpress.createExpressMiddleware({
				router: appRouter,
				createContext,
			})
		);
	}
}
