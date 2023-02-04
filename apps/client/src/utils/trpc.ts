import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { AppRouter } from "@trpc-poc/api";
import CookieService from "./CookieService";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:4000/trpc",
			fetch: async (url, options) => {
				const res = await fetch(url, {
					...options,
					credentials: "include",
				});
				if (res.status === 401) {
					const { mutateAsync } =
						trpc.authentication.refreshToken.useMutation();
					await mutateAsync();
				}

				const accessToken = res.headers.get("x-auth");
				const refreshToken = res.headers.get("x-refresh-token");
				if (accessToken) {
					CookieService.set("accessToken", accessToken);
				}
				if (refreshToken) {
					CookieService.set("refreshToken", refreshToken);
				}

				return res;
			},

			headers() {
				const accessToken = CookieService.get("accessToken");
				const refreshToken = CookieService.get("refreshToken");

				return {
					["x-auth"]: accessToken,
					["x-refresh-token"]: refreshToken,
				};
			},
		}),
	],
});
