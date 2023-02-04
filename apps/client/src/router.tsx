import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages";
import React from "react";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleType } from "@trpc-poc/contracts";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute allowedRoles={[RoleType.admin, RoleType.user]}>
				<Layout>
					<HomePage />
				</Layout>
			</ProtectedRoute>
		),
	},
	{
		path: "/sign-up",
		element: (
			<Layout>
				<SignUp />
			</Layout>
		),
	},
	{
		path: "/sign-in",
		element: (
			<Layout>
				<SignIn />
			</Layout>
		),
	},
]);
