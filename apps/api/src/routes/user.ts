import { router } from "trcp";
import { publicProcedure } from "procedures";

export const usersRouter = router({
	getUser: publicProcedure.query(() => {
		return {
			id: 1,
			name: "John Doe",
		};
	}),
});
