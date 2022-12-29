import aliasPlugin from "@rollup/plugin-alias";
import esbuildPlugin from "rollup-plugin-esbuild";
import * as path from "path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import typescript from "@rollup/plugin-typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");

const tsExtension = /\.(?:ts|mts|cts|tsx)$/;
export const isTsFile = (url) => tsExtension.test(url);

export function isFileReadable(filename) {
	try {
		fs.accessSync(filename, fs.constants.R_OK);
		return true;
	} catch {
		return false;
	}
}

function resolveId(importee) {
	let res = path.resolve(importee);

	if (isFileReadable(path.resolve(res, "index.ts"))) {
		res = path.resolve(res, "index.ts");
	}

	if (isFileReadable(isTsFile(res) ? res : `${res}.ts`)) {
		res = isTsFile(res) ? res : `${res}.ts`;
	}

	return res;
}

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
			resolve: [".ts", ".js"],
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
			customResolver: resolveId,
		}),
		esbuildPlugin({
			include: /\.[jt]sx?$/,
			sourceMap: true,
			minify: process.env.NODE_ENV === "production",
			target: "es2020",
			tsconfig: "tsconfig.json",
			platform: "node",
		}),
		typescript({
			tsconfig: path.resolve(__dirname, "tsconfig.json"),
		}),
	],
};

export default config;
