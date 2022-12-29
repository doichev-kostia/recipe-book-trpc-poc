import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";

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
