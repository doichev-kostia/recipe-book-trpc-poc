import { t } from "./trpc";
import { isAuthenticated } from "./middlewares";

export const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(isAuthenticated);
