import esbuildPlugin from "rollup-plugin-esbuild";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "index.ts",
	output: {
		file: "dist/index.js",
		format: "esm",
	},

	plugins: [
		nodeResolve({
			extensions: [".js", ".ts"],
		}),
		commonjs(),
		esbuildPlugin({
			include: /\.[jt]sx?$/,
			sourceMap: true,
			minify: process.env.NODE_ENV === "production",
			target: "es2020",
			tsconfig: "tsconfig.json",
			platform: "browser",
		}),
	],
};
