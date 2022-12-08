import { router } from "./trcp.js";
import { authenticationRouter } from "./routes/authentication/authentication.route.js";
import { usersRouter } from "./routes/user.js";

export const appRouter = router({
	authentication: authenticationRouter,
	users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
