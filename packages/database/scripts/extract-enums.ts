import * as fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const schemaPath = path.resolve(__dirname, "../prisma/schema.prisma");
const enumsFile = path.resolve(__dirname, "../src/enums.ts");

const schema = await fs.readFile(schemaPath, "utf-8");

const enums = schema.match(/enum\s+(\w+)\s+\{([^}]+)\}/g);

if (!enums) process.exit(0);

const enumNames = enums.map((enumDeclaration) => {
	const [_, name] = enumDeclaration.match(/enum\s+(\w+)\s+\{/) || [];
	return name as string;
});

await fs.writeFile(
	enumsFile,
	`export {${enumNames.join(", ")}} from "@prisma/client";`,
	"utf-8"
);
