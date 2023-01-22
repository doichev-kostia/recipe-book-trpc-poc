import esbuildPlugin from "rollup-plugin-esbuild";

export default {
	input: "index.ts",
	output: {
		file: "dist/index.js",
		format: "esm",
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
