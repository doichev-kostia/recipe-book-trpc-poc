import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc";
import { appRouter } from "./router";
import { fileRouter } from "./routes/files/files.route";

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
				credentials: true,
				exposedHeaders: ["x-auth", "x-refresh-token"],
			})
		);

		this.host.use(
			"/api/files",
			express.urlencoded({ extended: true }),
			fileRouter
		);

		this.host.use(
			"/trpc",
			trpcExpress.createExpressMiddleware({
				router: appRouter,
				createContext,
				onError: ({ error }) => {
					if (error.code === "INTERNAL_SERVER_ERROR") {
						Sentry.captureException(error);
					}
				},
			})
		);

		this.host.use(
			(
				error: Error,
				request: Request,
				response: Response,
				next: NextFunction
			) => {
				if (error) {
					Sentry.captureException(error);
					response.status(500).json({ error: error.message });
				} else {
					next();
				}
			}
		);
	}
}
