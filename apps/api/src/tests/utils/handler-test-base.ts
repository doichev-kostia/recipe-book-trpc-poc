import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { getEm, RequestContextManager } from "utils/request-context-manager.js";
import ormConfig from "../../orm.config.js";
import { TestBase } from "tests/utils/test-base.js";
import { setFixtureDate } from "utils/helpers/date.js";

export class HandlerTestBase extends TestBase {
	public orm: MikroORM<PostgreSqlDriver>;

	public readonly createConnection = async () => {
		try {
			this.orm = (await MikroORM.init(
				ormConfig
			)) as MikroORM<PostgreSqlDriver>;
			RequestContextManager.setEm(this.orm.em.fork());
		} catch (error) {
			console.log("Error while connecting to the database", error);
			throw error;
		}
		this.setTestDbService(this.orm);
		setFixtureDate();
	};

	public static readonly before = async () => {
		const base = new HandlerTestBase();
		await base.createConnection();
		const em = getEm();
		return { base, em };
	};

	public closeConnection = async () => {
		try {
			await this.orm.close();
		} catch (error) {
			console.log("Error while closing the database connection", error);
			throw error;
		}
	};

	public after = async () => {
		await this.closeConnection();
	};
}
