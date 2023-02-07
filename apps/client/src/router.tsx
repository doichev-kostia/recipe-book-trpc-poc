import {
	createBrowserRouter,
	Navigate,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import React from "react";
import SignUp from "./routes/sign-up";
import SignIn from "./routes/sign-in";
import Dashboard from "./routes/dashboard";
import { loader as singOutLoader } from "./routes/sign-out";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProfilePage, {
	action as profileAction,
	loader as profileLoader,
} from "@/routes/profile/$userId";
import { trpc } from "@/utils/trpc";

export const router = (utils: ReturnType<typeof trpc.useContext>) =>
	createBrowserRouter([
		{
			element: (
				<Layout>
					<Outlet />
				</Layout>
			),
			children: [
				{
					path: "/",
					element: (
						<ProtectedRoute allowedRoles={["admin", "user"]}>
							<Outlet />
						</ProtectedRoute>
					),
					children: [
						{
							index: true,
							element: <Navigate to="/dashboard" />,
						},
						{
							path: "dashboard",
							element: <Dashboard />,
						},
						{
							path: "profile/:userId",
							element: <ProfilePage />,
							loader: profileLoader(utils),
							action: profileAction(utils),
						},
					],
				},
				{
					path: "/sign-up",
					element: <SignUp />,
				},
				{
					path: "/sign-in",
					element: <SignIn />,
				},
				{
					path: "/sign-out",
					loader: singOutLoader,
				},
			],
		},
	]);

export const AppRouter = () => {
	const utils = trpc.useContext();
	return <RouterProvider router={router(utils)} />;
};
