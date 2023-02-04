import { QueryClient } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { trpc } from "./utils/trpc";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: (error) => {
				if (!(error instanceof TRPCError)) return;

				if (error.code === "UNAUTHORIZED") {
					const { mutate } =
						trpc.authentication.refreshToken.useMutation();
					mutate();
				}
			},
		},
	},
});
