import ormConfig from "orm.config.js";
import { MikroORM } from "@mikro-orm/core";
import { RequestContextManager } from "utils/request-context-manager.js";
import { dropAndLoad } from "utils/seeder/pumpAndDump/dropAndLoad.js";

const loadFixtures = async () => {
	const orm = await MikroORM.init(ormConfig);
	RequestContextManager.setEm(orm.em.fork());
	await dropAndLoad(orm, false);
};

loadFixtures()
	.then(() => {
		console.log("Fixtures loaded");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
