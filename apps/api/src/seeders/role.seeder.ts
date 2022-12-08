import { EntityManager } from "@mikro-orm/core";
import { EntitySeeder } from "utils/seeder/entity.seeder.js";
import { SeederEntityMap } from "utils/seeder/seeder.js";
import { Role } from "entities/role.entity.js";
import { User } from "entities/user.entity.js";
import { Builder } from "utils/builder.js";
import { createSimpleUUID } from "utils/helpers/create-simple-uuid.js";
import { RoleType } from "@trpc-poc/contracts";
import { UserSeeder } from "./user.seeder.js";

export class RoleSeeder extends EntitySeeder<Role> {
	public dependencies = [UserSeeder];

	public seed = async (em: EntityManager, entities: SeederEntityMap) => {
		const users = entities.get(User);

		this.entities = Builder.list(Role, 10)
			.with((x) => ({
				id: createSimpleUUID(x),
				type: RoleType.user,
				user: users[x],
			}))
			.build(em);
		return this.entities;
	};
}
