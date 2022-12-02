import {
	Collection,
	Entity,
	Enum,
	ManyToOne,
	OneToMany,
} from "@mikro-orm/core";
import { Base } from "utils/entities/base.entity";
import { RoleType } from "@trpc-poc/contracts";

import { User } from "./user.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class Role extends Base<Role> {
	@Enum(() => RoleType)
	public type: RoleType = RoleType.user;

	@ManyToOne(() => User)
	public user: User;

	@OneToMany(() => Recipe, (recipe) => recipe.role)
	public recipes = new Collection<Recipe>(this);
}
