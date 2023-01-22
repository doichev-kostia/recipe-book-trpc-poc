import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

export const getTokenData = <T extends object>(
	token: string,
	secret: string = process.env.JWT_SECRET
): JwtPayload & T => {
	try {
		return jwt.verify(token, secret) as JwtPayload & T;
	} catch (error) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}
};
