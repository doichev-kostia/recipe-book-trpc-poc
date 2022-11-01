import { publicProcedure, router } from "../trcp";

export const usersRouter = router({
	getUser: publicProcedure.query(() => {
		return {
			id: 1,
			name: "John Doe",
		};
	}),
});
