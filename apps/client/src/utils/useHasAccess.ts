import { useMemo } from "react";
import { RoleType } from "@trpc-poc/contracts";
import { useTokenData } from "./token";

export function useHasAccess(allowedRoles: RoleType[]): boolean {
	const tokenData = useTokenData();
	return useMemo(
		() => !!tokenData && allowedRoles.includes(tokenData.role.type),
		[allowedRoles, tokenData]
	);
}
