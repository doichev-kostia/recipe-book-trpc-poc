import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "./utils/trpc";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./query-client";

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
