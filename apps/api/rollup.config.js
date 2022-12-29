import aliasPlugin from "@rollup/plugin-alias";
import esbuildPlugin from "rollup-plugin-esbuild";
import * as path from "path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");

const customResolver = (id, importer, resolveOptions) => {};

/**
 *
 * @type {import("rollup").RollupOptions}
 */
const config = {
	input: path.resolve(src, "server.ts"),
	output: {
		format: "esm",
		dir: build,
	},
	plugins: [
		aliasPlugin({
			entries: [
				{
					find: "entities",
					replacement: path.resolve(src, "entities"),
				},
				{ find: "seeders", replacement: path.resolve(src, "seeders") },
				{ find: "utils", replacement: path.resolve(src, "utils") },
				{ find: "tests", replacement: path.resolve(src, "tests") },
				{ find: "routes", replacement: path.resolve(src, "routes") },
				{ find: "scripts", replacement: path.resolve(src, "scripts") },
				{
					find: "middlewares",
					replacement: path.resolve(src, "middlewares"),
				},
				{
					find: "procedures",
					replacement: path.resolve(src, "procedures.ts"),
				},
				{ find: "router", replacement: path.resolve(src, "router.ts") },
				{ find: "server", replacement: path.resolve(src, "server.ts") },
				{ find: "trpc", replacement: path.resolve(src, "trpc.ts") },
				{ find: "app", replacement: path.resolve(src, "app.ts") },
			],
			customResolver,
		}),
		esbuildPlugin({
			include: /\.[jt]sx?$/,
			minify: process.env.NODE_ENV === "production",
			target: "es2020",
			tsconfig: "tsconfig.json",
			platform: "node",
		}),
	],
};

export default config;
