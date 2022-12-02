import type { JestConfigWithTsJest } from "ts-jest";
// import { pathsToModuleNameMapper } from "ts-jest";
// @ts-ignore
import { compilerOptions } from "./tsconfig.json";

// // Get aliases defined in tsconfig.json
// const aliases = Object.keys(
// 	compilerOptions.paths as Record<string, string>
// ).reduce<Record<string, string>>((accumulator, key) => {
// 	const copy = { ...accumulator };
// 	/**
// 	 * @description for aliases in the TS config that starts with '@'
// 	 *
// 	 * @example
// 	 * import { Button } from '@components/Button';
// 	 */
// 	if (key.includes("@")) {
// 		copy[key] = compilerOptions.paths[key].map((path: string) =>
// 			path.replace("/*", "")
// 		);
// 	}
//
// 	return copy;
// }, {});
//
// const moduleNameMapper = pathsToModuleNameMapper(aliases, {
// 	prefix: "<rootDir>/src/",
// });

const config: JestConfigWithTsJest = {
	verbose: true,
	// preset used to run tests with TypeScript
	preset: "ts-jest",
	// Environment that will be used for testing. A
	testEnvironment: "node",
	transform: {
		// trnsform TypseScript ans JavaScript files using ts-jest
		"^.+\\.[tj]sx?$": [
			"ts-jest",
			{
				// can have different name. Basically, it is a file that contains the TypeScript config
				tsconfig: "./tsconfig.json",
				isolatedModules: true,
			},
		],
	},
	// glob patterns Jest uses to detect test files
	testMatch: ["<rootDir>/src/**/?(*.)+(test|spec).[jt]s?(x)"],
	moduleDirectories: ["node_modules", "src"],
	setupFiles: ["<rootDir>/jest.setup.ts"],
	reporters: ["default", "jest-junit"],
	// moduleNameMapper,
};
export default config;
