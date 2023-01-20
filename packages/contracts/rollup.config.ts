import { RollupOptions } from "rollup";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import esbuildPlugin from "rollup-plugin-esbuild";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");
const entry = path.resolve(src, "index.ts");

/**
 * Go to @trpc-poc/db package and transpile it
 * Get only enums from it
 * Put them in @trpc-poc/contracts package
 */

const config: RollupOptions = {
	input: entry,

	output: {
		format: "esm",
		dir: build,
		sourcemap: true,
	},
	plugins: [
		esbuildPlugin({
			include: /\.[jt]sx?$/,
			sourceMap: true,
			minify: process.env.NODE_ENV === "production",
			target: "es2020",
			tsconfig: "tsconfig.json",
			platform: "browser",
		}),
		nodeResolve({ extensions: [".js", ".ts"] }),
		commonJS(),
	],
};

export default config;
