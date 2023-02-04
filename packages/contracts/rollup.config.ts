import { RollupOptions } from "rollup";
import esbuildPlugin from "rollup-plugin-esbuild";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");
const entry = path.resolve(src, "index.ts");

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
			minify: true,
			target: "es2020",
			tsconfig: "tsconfig.json",
			platform: "browser",
		}),
	],
};

export default config;
