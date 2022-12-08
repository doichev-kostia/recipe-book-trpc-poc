import "reflect-metadata";
import { App } from "./app.js";

(async () => {
	const app = new App();
	// await app.createDBConnection();
	app.listen();
})();

export type { AppRouter } from "./router";
