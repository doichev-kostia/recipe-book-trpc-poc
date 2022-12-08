import path from "path";
import alias from '@rollup/plugin-alias';

const root = path.join(__dirname, ".");
const build = path.join(root, "build");
const entry = path.resolve(build, "server.js");

/**
 * @type {import('rollup').RollupOptions}
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
					find: 'entities',
					replacement: path.resolve(build, 'entities'),
				},
				{
					find: 'seeders',
					replacement: path.resolve(build, 'seeders'),
				},
				{
					find: 'tests',
					replacement: path.resolve(build, 'tests'),
				},
				{
					find: 'utils',
					replacement: path.resolve(build, 'utils'),
				},
				{
					find: 'routes',
					replacement: path.resolve(build, 'routes'),
				},
				{
					find: 'scripts',
					replacement: path.resolve(build, 'scripts'),
				},
				{
					find: 'middlewares',
					replacement: path.resolve(build, 'middlewares.js'),
				},
				{
					find: 'procedures',
					replacement: path.resolve(build, 'procedures.js'),
				},
				{
					find: 'router',
					replacement: path.resolve(build, 'router.js'),
				},
				{
					find: 'server',
					replacement: path.resolve(build, 'server.js'),
				},
				{
					find: 'trpc',
					replacement: path.resolve(build, 'trpc.js'),
				},
				{
					find: 'app',
					replacement: path.resolve(build, 'app.js'),
				}
			]
		})
	]
}

export default config
