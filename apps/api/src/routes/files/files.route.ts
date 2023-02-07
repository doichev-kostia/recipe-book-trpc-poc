import { Router } from "express";
import { fileMiddleware } from "../../middlewares";
import * as fs from "node:fs";

export const fileRouter: Router = Router();

fileRouter.post("/upload", fileMiddleware, async (req, res) => {
	const { file } = req;
	if (!file) {
		return res.status(400).json({ error: "No file provided" });
	}

	const base64 = await fs.promises.readFile(file.path, {
		encoding: "base64",
	});

	const url = `data:${file.mimetype};base64,${base64}`;

	res.status(201).json({ fileUrl: url });
});
