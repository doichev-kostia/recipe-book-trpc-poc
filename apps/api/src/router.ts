import { router } from "./trpc";
import { authenticationRouter } from "./routes/authentication/authentication.route";
import { usersRouter } from "./routes/users/user.route";

export const appRouter = router({
	authentication: authenticationRouter,
	users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
