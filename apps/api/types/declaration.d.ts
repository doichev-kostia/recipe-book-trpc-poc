declare module "hash-files" {
	export default function hashFiles(
		options: {
			files: string[];
		},
		callback: (error: Error | null, hash: string) => void
	): void;
}

declare global {
	namespace Express {
		export interface Request {
			file?: Express.Multer.File;
		}
	}
}
