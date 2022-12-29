import "reflect-metadata";
// import { PrismaClient } from "@prisma/client";
import { App } from "./app";
//
// const prisma = new PrismaClient();
//
// async function main() {
// 	await prisma.user.create({
// 		data: {
// 			name: "Alice",
// 			email: "alice@prisma.io",
// 			posts: {
// 				create: { title: "Hello World" },
// 			},
// 			profile: {
// 				create: { bio: "I like turtles" },
// 			},
// 		},
// 	});
//
// 	const allUsers = await prisma.user.findMany({
// 		include: {
// 			posts: true,
// 			profile: true,
// 		},
// 	});
// 	console.dir(allUsers, { depth: null });
// }
//
// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
//
(async () => {
	const app = new App();
	// await app.createDBConnection();
	app.listen();
})();

export type { AppRouter } from "./router";
