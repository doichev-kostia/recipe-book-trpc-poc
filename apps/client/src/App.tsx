import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "./utils/trpc";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./query-client";
import CookieService from "@/utils/CookieService";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";
import { getActions } from "@/stores/auth-store";

const accessToken = CookieService.get(ACCESS_TOKEN_KEY);
const refreshToken = CookieService.get(REFRESH_TOKEN_KEY);

const actions = getActions();

actions.setAccessToken(accessToken);
actions.setRefreshToken(refreshToken);

function App() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
