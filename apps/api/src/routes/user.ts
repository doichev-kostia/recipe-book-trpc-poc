import { router } from "trcp.js";
import { publicProcedure } from "procedures.js";

export const usersRouter = router({
	getUser: publicProcedure.query(() => {
		return {
			id: 1,
			name: "John Doe",
		};
	}),
});
