import { t } from "./trcp";
import { isAuthenticated } from "./middlewares";

export const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(isAuthenticated);
