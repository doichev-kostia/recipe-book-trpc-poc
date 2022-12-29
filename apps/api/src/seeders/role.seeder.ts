import { EntityManager } from "@mikro-orm/core";
import { EntitySeeder } from "utils/seeder/entity.seeder";
import { SeederEntityMap } from "utils/seeder/seeder";
import { Role } from "entities/role.entity";
import { User } from "entities/user.entity";
import { Builder } from "utils/builder";
import { createSimpleUUID } from "utils/helpers/create-simple-uuid";
import { RoleType } from "@trpc-poc/contracts";
import { UserSeeder } from "./user.seeder";

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
