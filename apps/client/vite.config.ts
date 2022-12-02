import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	// add SWC transpiler
	plugins: [react()],
	resolve: {
		alias: {
			pages: path.resolve(__dirname, "src/pages"),
		},
	},
});
