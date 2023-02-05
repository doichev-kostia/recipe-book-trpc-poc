import { LoaderFunction, redirect } from "react-router-dom";
import { clearTokens } from "@/utils/token";

export const loader: LoaderFunction = async () => {
	clearTokens();
	return redirect("/sign-in");
};
