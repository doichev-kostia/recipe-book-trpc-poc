import {
	Entity,
	ManyToOne,
	OneToMany,
	Property,
	TimeType,
} from "@mikro-orm/core";
import { Base } from "utils/entities/base.entity.js";
import { Role } from "./role.entity.js";
import { Ingredient } from "./ingredient.entity.js";

@Entity()
export class Recipe extends Base<Recipe> {
	@Property()
	public name: string;

	@Property()
	public description: string;

	@OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
	public ingredients: Ingredient[];

	@Property({ type: TimeType })
	public cookTime: string;

	@Property({ type: TimeType })
	public prepTime: string;

	@ManyToOne(() => Role)
	public role: Role;
}
