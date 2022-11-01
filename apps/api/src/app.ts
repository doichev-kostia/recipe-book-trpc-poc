import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trcp";
import { appRouter } from "./router";

// TODO: REPLACE WITH REAL SENTRY
const Sentry = {
	captureException: (err: any) => {
		console.error(err);
	},
};

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
				onError: ({ error, type, path, input, ctx, req }) => {
					if (error.code === "INTERNAL_SERVER_ERROR") {
						Sentry.captureException(error);
					}
				},
			})
		);
	}
}
