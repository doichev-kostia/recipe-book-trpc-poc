import { useMemo } from "react";
import { RoleType } from "@trpc-poc/contracts";
import { getTokenData } from "./token";

export function useHasAccess(allowedRoles: RoleType[]): boolean {
	const tokenData = getTokenData();
	return useMemo(
		() => !!tokenData && allowedRoles.includes(tokenData.role.type),
		[allowedRoles, tokenData]
	);
}
