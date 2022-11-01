import { App } from "./app";

(() => {
	const app = new App();

	app.listen();
})();

export type { AppRouter } from "app";
