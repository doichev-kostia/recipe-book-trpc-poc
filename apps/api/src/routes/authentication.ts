import { publicProcedure, router } from "../trcp";
import { RegisterBody } from "@trpc-poc/contracts";

export const authenticationRouter = router({
	register: publicProcedure.input(RegisterBody).mutation(({ input }) => {
		console.log(input);
	}),
});
