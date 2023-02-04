import CookieService from "./CookieService";
import { ACCESS_TOKEN_KEY } from "../constants";
import jwtDecode from "jwt-decode";
import { AccessTokenData } from "@trpc-poc/contracts";

export const getTokenData = () => {
	try {
		const token = CookieService.get(ACCESS_TOKEN_KEY);
		return token ? jwtDecode<AccessTokenData>(token) : undefined;
	} catch (error) {
		return undefined;
	}
};

export const getAuthData = () => {
	const tokenData = getTokenData();

	if (!tokenData) {
		throw new Error("Unauthorized");
	}

	return tokenData;
};
