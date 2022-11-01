import path from "path";
import { RollupOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

const root = path.resolve(__dirname, ".");
const src = path.resolve(root, "src");
const build = path.resolve(root, "build");
const entry = path.resolve(src, "index.ts");

const babelPlugin = babel({
	babelHelpers: "bundled",
	exclude: /node_modules/,
	extensions: [".ts", ".tsx", ".native.ts"],
});

const config: RollupOptions = {
	input: entry,
	output: [
		{
			format: "esm",
			file: `${build}/index.mjs`,
			sourcemap: true,
		},
		{
			format: "esm",
			file: `${build}/index.esm.js`,
			sourcemap: true,
		},
		{
			format: "cjs",
			file: `${build}/index.js`,
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [babelPlugin, nodeResolve({ extensions: [".ts", ".tsx"] }), commonJS()],
};

export default config;
