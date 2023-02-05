import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";
import SignUp from "./routes/sign-up";
import SignIn from "./routes/sign-in";
import Dashboard from "./routes/dashboard";
import { loader as singOutLoader } from "./routes/sign-out";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
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
