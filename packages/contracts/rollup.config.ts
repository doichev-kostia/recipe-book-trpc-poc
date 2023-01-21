import { Plugin, RollupOptions } from "rollup";
import esbuildPlugin from "rollup-plugin-esbuild";

import { promisify } from "node:util";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as fs from "node:fs";

import resolve from "resolve";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const src = path.resolve(__dirname, "src");
const build = path.resolve(__dirname, "build");
const entry = path.resolve(src, "index.ts");

const resolveImportPath = promisify(resolve);

// extract prisma enums
const enumsLoader: Plugin = {
	name: "enums-loader",
	async transform(code: string) {
		const match = code.match(/export {.*} from "@trpc-poc\/database";/);
		if (!match) return code;

		// get values inside the { }
		let enums = code.match(/(?<=\{ ).*(?=\s\})/);

		if (!enums) return code;

		enums = enums[0].split(", ");

		const pkg: string = (await resolveImportPath("@trpc-poc/database"))
			// truncate the path to the main package file
			.split("/")
			.slice(0, -1)
			.join("/");

		const content = await fs.promises.readFile(
			`${pkg}/prisma/generated/prisma-client/index.js`,
			"utf-8"
		);

		let enumsContent = "";

		for (const enumName of enums) {
			const regex = new RegExp(
				`exports.${enumName} = makeEnum\\((.|\\n)*?\\);`,
				"m"
			);
			const enumMatch = content.match(regex);
			if (!enumMatch)
				throw new Error(
					`Enum ${enumName} not found in @trpc-poc/database package`
				);

			const enumContent = enumMatch[0]
				.match(/(?<=\()(.|\n)*(?=\))/)?.[0]
				.replaceAll(":", " =");

			enumsContent += `export enum ${enumName} ${enumContent};\n\n`;
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
