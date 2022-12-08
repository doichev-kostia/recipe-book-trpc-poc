import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "utils/entities/base.entity.js";
import { Recipe } from "./recipe.entity.js";

@Entity()
export class Ingredient extends Base<Ingredient> {
	@Property()
	public name: string;

	@Property()
	public quantity: number;

	@Property()
	public unit: string;

	@ManyToOne(() => Recipe)
	public recipe: Recipe;
}
