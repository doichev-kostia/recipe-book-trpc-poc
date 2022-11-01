import { router } from "./trcp";
import { authenticationRouter } from "./routes/authentication";
import { usersRouter } from "./routes/user";

export const appRouter = router({
	authentication: authenticationRouter,
	users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
