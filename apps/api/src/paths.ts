import path from "path";

const root = path.join(import.meta.url, ".");
const src = path.join(root, "src");
const build = path.join(root, "build");
const entities = path.join(src, "entities");
const seeders = path.join(src, "seeders");
const tests = path.join(src, "tests");
const utils = path.join(src, "utils");
const routes = path.join(src, "routes");
const scripts = path.join(src, "scripts");
const ormConfig = path.join(src, "orm.config.ts");
const middlewares = path.join(src, "middlewares.ts");
const procedures = path.join(src, "procedures.ts");
const router = path.join(src, "router.ts");
const server = path.join(src, "server.ts");
const trpc = path.join(src, "trpc.ts");
const app = path.join(src, "app.ts");

export const paths = {
	root,
	src,
	build,
	entities,
	seeders,
	tests,
	utils,
	routes,
	scripts,
	middlewares,
	ormConfig,
	procedures,
	router,
	server,
	trpc,
	app,
	paths: import.meta.url,
} as const;
