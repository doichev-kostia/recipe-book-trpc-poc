import { middleware } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getTokenData } from "./utils/helpers/tokens/getTokenData";
import { AccessTokenData } from "@trpc-poc/contracts";
import { NextFunction, Request, RequestHandler, Response } from "express";
import multer from "multer";
import * as os from "os";

export const isAuthenticated = middleware(({ next, ctx }) => {
	if (!ctx.accessToken) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}

	return next({
		ctx: {
			// Infers the `accessToken` as non-nullable
			accessToken: ctx.accessToken,
			tokenData: getTokenData<AccessTokenData>(ctx.accessToken),
		},
	});
});

export const fileMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | RequestHandler> => {
	if (!request.headers["content-type"]?.includes("multipart/form-data")) {
		return next();
	}

	const upload = multer({
		dest: os.tmpdir(),
	}).single("file");

	request.file = await new Promise((resolve, reject) => {
		upload(request, response, (err) => {
			if (err) {
				reject(err);
			}

			return resolve(request.file);
		});
	});

	return next();
};
