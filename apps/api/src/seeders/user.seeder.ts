import { EntityManager } from "@mikro-orm/core";
import { EntitySeeder } from "utils/seeder/entity.seeder.js";
import { User } from "entities/user.entity.js";
import { Builder } from "utils/builder.js";
import { createSimpleUUID } from "utils/helpers/create-simple-uuid.js";
import { faker } from "@faker-js/faker";
import { createTestEmail, createTestPassword } from "tests/utils/constants.js";

export class UserSeeder extends EntitySeeder<User> {
	public seed = async (em: EntityManager) => {
		this.entities = Builder.list(User, 10)
			.with((x) => ({
				id: createSimpleUUID(x),
				email: createTestEmail(x.toString()),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				username: faker.internet.userName(),
				password: createTestPassword(x.toString()),
			}))
			.build(em);

		await Promise.all(
			this.entities.map(
				async (user) => await user.setPassword(user.password)
			)
		);
		return this.entities;
	};
}
