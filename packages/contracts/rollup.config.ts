import { Plugin, RollupOptions } from "rollup";
import esbuildPlugin from "rollup-plugin-esbuild";

import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as fs from "node:fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");
const entry = path.resolve(src, "index.ts");

// extract prisma enums
const enumsLoader: Plugin = {
	name: "enums-loader",
	async transform(code: string) {
		const match = code.match(/export {.*} from "@trpc-poc\/database";/);
		if (!match) return code;

		const pkg = path.resolve(__dirname, "node_modules/@trpc-poc/database");

		const content = await fs.promises.readFile(
			`${pkg}/prisma/schema.prisma`,
			"utf-8"
		);

		const enums = content.match(/enum\s+\w+\s+\{[\s\S]*?\}/g);

		let enumsContent = "";

		for (const en of enums) {
			const name = en.match(/enum\s+(\w+)\s+\{/)[1];

			const values = en
				.match(/enum\s+\w+\s+\{([\s\S]*?)\}/)[1]
				.split("\n")
				.map((v) => v.trim())
				.filter(Boolean);

			enumsContent += `export enum ${name} {\n${values
				.map((v) => `\t${v} = "${v}"`)
				.join(",\n")}\n}\n`;
		}

		return enumsContent;
	},
};

const config: RollupOptions = {
	input: entry,

	output: {
		format: "esm",
		dir: build,
		sourcemap: true,
	},
	plugins: [
		enumsLoader,
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

export default config;
