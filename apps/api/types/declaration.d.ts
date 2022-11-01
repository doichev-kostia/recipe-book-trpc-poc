import { EntityManager } from "@mikro-orm/core";

declare module "express" {
	interface Request {
		em: EntityManager;
	}
}

declare module "hash-files" {
	export default function hashFiles(
		options: {
			files: string[];
		},
		callback: (error: Error | null, hash: string) => void
	): void;
}
