/**
 * Required for zustand stores, as the lib doesn't expose this type
 */
export type ExtractState<S> = S extends {
	getState: () => infer T;
}
	? T
	: never;
