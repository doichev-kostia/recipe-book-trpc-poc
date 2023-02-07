import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { AppRouter } from "@trpc-poc/api";
import CookieService from "./CookieService";
import { getActions } from "@/stores/auth-store";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: `${import.meta.env.VITE_API_BASE_URL}/trpc`,
			fetch: async (url, options) => {
				const res = await fetch(url, {
					...options,
					signal: options?.signal as AbortSignal,
					credentials: "include",
				});
				if (res.status === 401) {
					// can't use hooks here
					// const { mutateAsync } =
					// 	trpc.authentication.refreshToken.useMutation();
					// await mutateAsync();
				}

				const accessToken = res.headers.get("x-auth");
				const refreshToken = res.headers.get("x-refresh-token");
				const actions = getActions();
				if (accessToken) {
					CookieService.set(ACCESS_TOKEN_KEY, accessToken);
					actions.setAccessToken(accessToken);
				}
				if (refreshToken) {
					CookieService.set(REFRESH_TOKEN_KEY, refreshToken);
					actions.setRefreshToken(refreshToken);
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
