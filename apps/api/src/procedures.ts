import { t } from "./trcp.js";
import { isAuthenticated } from "./middlewares.js";

export const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(isAuthenticated);
