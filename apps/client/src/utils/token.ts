import jwtDecode from "jwt-decode";
import { AccessTokenData } from "@trpc-poc/contracts";
import { getActions, useAccessToken } from "@/stores/auth-store";
import CookieService from "@/utils/CookieService";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export const getTokenData = (token: string) => {
	return jwtDecode<AccessTokenData>(token);
};

export const useTokenData = () => {
	const accessToken = useAccessToken();
	return accessToken ? getTokenData(accessToken) : undefined;
};

export const useAuthData = () => {
	const tokenData = useTokenData();
	if (!tokenData) throw new Error("Not authenticated");

	return tokenData;
};

export const clearTokens = () => {
	const actions = getActions();
	actions.clearTokens();
	CookieService.remove(ACCESS_TOKEN_KEY, { path: "/" });
	CookieService.remove(REFRESH_TOKEN_KEY, { path: "/" });
};
