import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { ExtractState } from "../utils/types";
import { devtools } from "zustand/middleware";

type AuthStore = {
	accessToken: string | undefined;
	refreshToken: string | undefined;

	actions: {
		setAccessToken: (accessToken: string | undefined) => void;
		setRefreshToken: (refreshToken: string | undefined) => void;
		clearTokens: () => void;
	};
};

const authStore = createStore<AuthStore>()(
	devtools(
		(set, get) => ({
			accessToken: undefined,
			refreshToken: undefined,
			actions: {
				setAccessToken: (accessToken: string | undefined) =>
					set({
						accessToken,
					}),
				setRefreshToken: (refreshToken: string | undefined) =>
					set({
						refreshToken,
					}),
				clearTokens: () =>
					set({
						accessToken: undefined,
						refreshToken: undefined,
					}),
			},
		}),
		{
			name: "auth-store",
			enabled: import.meta.env.DEV,
		}
	)
);

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
	state.accessToken;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) =>
	state.refreshToken;
const actionsSelector = (state: ExtractState<typeof authStore>) =>
	state.actions;

export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

const useAuthStore = <U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) =>
	useStore(authStore, selector);

export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useActions = () => useAuthStore(actionsSelector);
