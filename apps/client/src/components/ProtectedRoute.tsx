import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleType } from "@trpc-poc/contracts";

import { useHasAccess } from "../utils/useHasAccess";
import { signInPath } from "../urls";

type ProtectedRouteProps = {
	allowedRoles: RoleType[];
	children?: React.ReactNode;
};

export const ProtectedRoute = ({
	allowedRoles,
	children,
}: ProtectedRouteProps): JSX.Element => {
	const location = useLocation();
	const hasAccess = useHasAccess(allowedRoles);

	if (!hasAccess) {
		return (
			<Navigate
				to={{
					pathname: signInPath,
					search: new URLSearchParams({
						redirect: location.pathname,
					}).toString(), // if user !hasAccess and directly open private route -> we need to save it in state to redirect later
				}}
			/>
		);
	}

	return <>{children}</>;
};
