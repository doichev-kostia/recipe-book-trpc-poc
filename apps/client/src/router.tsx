import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages";
import React from "react";
import SignUp from "./pages/sign-up";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
]);
