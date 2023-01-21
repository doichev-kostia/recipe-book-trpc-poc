import commonjs from "@rollup/plugin-commonjs";

const BASE_FOLDER = "prisma/generated/prisma-client";
const OUT_FOLDER = "prisma/generated/prisma-client-es";

const config = ({ filename, plugins }) => {
	return {
		input: [`${BASE_FOLDER}/${filename}`],
		output: {
			file: `${OUT_FOLDER}/${filename}`,
			format: "es",
		},
		plugins: [...plugins],
	};
};

export default [config({ filename: "index.js", plugins: [commonjs()] })];
