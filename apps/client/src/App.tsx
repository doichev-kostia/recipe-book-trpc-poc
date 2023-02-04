import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./query-client";
import CookieService from "./utils/CookieService";

function App() {
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:4000/trpc",
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
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
