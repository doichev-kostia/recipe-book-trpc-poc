import path from "path";
import { RollupOptions } from "rollup";
import { minify } from "rollup-plugin-swc3";
import alias from "@rollup/plugin-alias";
import esbuild from "rollup-plugin-esbuild";

const root = path.join(__dirname, ".");
const build = path.resolve(root, "build");
const src = path.resolve(root, "src");
const entry = path.resolve(src, "server.ts");

const isWatchMode = process.argv.includes("--watch");

/**
 *
 * @type {import("rollup").RollupOptions}
 */
const config = {
	input: entry,
	output: {
		format: "esm",
		dir: build,
	},
	plugins: [
		alias({
			entries: [
				{
					find: "entities",
					replacement: path.resolve(src, "entities"),
				},
				{
					find: "seeders",
					replacement: path.resolve(src, "seeders"),
				},
				{
					find: "tests",
					replacement: path.resolve(src, "tests"),
				},
				{
					find: "utils",
					replacement: path.resolve(src, "utils"),
				},
				{
					find: "routes",
					replacement: path.resolve(src, "routes"),
				},
				{
					find: "scripts",
					replacement: path.resolve(src, "scripts"),
				},
				{
					find: "middlewares",
					replacement: path.resolve(src, "middlewares.ts"),
				},
				{
					find: "procedures",
					replacement: path.resolve(src, "procedures.ts"),
				},
				{
					find: "router",
					replacement: path.resolve(src, "router.ts"),
				},
				{
					find: "server",
					replacement: path.resolve(src, "server.ts"),
				},
				{
					find: "trpc",
					replacement: path.resolve(src, "trpc.ts"),
				},
				{
					find: "app",
					replacement: path.resolve(src, "app.ts"),
				},
			],
		}),
		esbuild({
			platform: "node",
			format: "esm",
			treeShaking: true,
			sourceMap: true,
		}),
		// multiInput({
		// 	relative: src,
		// }),
		// typescript({
		// 	tsconfig: path.resolve(root, "tsconfig.json"),
		// 	tsconfigOverride: { emitDeclarationOnly: true },
		// 	abortOnError: !isWatchMode,
		// }),
		// externals({
		// 	packagePath: path.resolve(root, "package.json"),
		// }),
		// nodeResolve({
		// 	extensions: [".js", ".ts"],
		// }),
		// swc(),
		minify(),
	],
};

export default config;
