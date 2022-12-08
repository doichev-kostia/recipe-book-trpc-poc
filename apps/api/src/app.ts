import express, { Express, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trcp.js";
import { appRouter } from "./router.js";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import ormConfig from "./orm.config.js";

// TODO: REPLACE WITH REAL SENTRY
const Sentry = {
	captureException: (err: any) => {
		console.error(err);
	},
};

export class App {
	public orm!: MikroORM<PostgreSqlDriver>;
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

	public async createDBConnection() {
		try {
			this.orm = await MikroORM.init(ormConfig);
			console.log("Database connection established");
		} catch (error) {
			console.error(
				"An error has occurred while connecting to the DB",
				error
			);
		}
	}

	private initializeMiddlewares(): void {
		this.host.use(
			cors({
				origin: true,
			})
		);

		this.host.use((req, __, next: NextFunction) => {
			(req as any).em = this.orm.em.fork();
			RequestContext.create(this.orm.em, next);
		});

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
	}
}
