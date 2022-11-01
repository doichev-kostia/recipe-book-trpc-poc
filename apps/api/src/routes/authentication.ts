import { publicProcedure, router } from "../trcp";
import { RegisterBody, UserView } from "@trpc-poc/contracts";

export const authenticationRouter = router({
	register: publicProcedure
		.input(RegisterBody)
		.output(UserView)
		.mutation(({ input }) => {
			return {
				firstName: "John",
				lastName: "Doe",
				email: input.email,
				password: input.password,
			};
		}),
});
