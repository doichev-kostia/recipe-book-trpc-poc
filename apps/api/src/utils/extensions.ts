import { TRPCError } from "@trpc/server";

export const noEntityFoundError = function (entityName: string): Error {
	throw new TRPCError({
		code: "NOT_FOUND",
		cause: "entityNotFound",
		message: `${entityName} not found`,
	});
};
