import { t } from "./trpc";
import { isAuthenticated } from "./middlewares";

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
