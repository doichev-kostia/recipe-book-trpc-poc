import {
	AssignOptions,
	BaseEntity,
	EntityData,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";

export class Base<T extends { id: string }> extends BaseEntity<T, "id"> {
	@PrimaryKey({ columnType: "uuid" })
	public id: string = v4();

	@Property({ defaultRaw: `now()`, length: 3 })
	public createdAt: Date = new Date();

	@Property({ defaultRaw: `now()`, onUpdate: () => new Date(), length: 3 })
	public updatedAt: Date = new Date();

	public assign(data: EntityData<T>, options?: AssignOptions) {
		return super.assign(data, {
			...options,
			mergeObjects: true,
			updateByPrimaryKey: false,
		}) as T;
	}
}
