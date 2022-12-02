import { Base } from "utils/entities/base.entity";
import { hashPassword } from "utils/hash-password";
import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";

import { Role } from "./role.entity";
import { RefreshToken } from "./token/refresh-token.entity";

@Entity()
export class User extends Base<User> {
	@Property()
	public firstName?: string;

	@Property()
	public lastName?: string;

	@Property({ unique: true })
	public email: string;

	@Property()
	public password: string;

	@OneToMany(() => Role, (role) => role.user)
	public roles = new Collection<Role>(this);

	@OneToMany(() => RefreshToken, (token) => token.user)
	public refreshTokens = new Collection<RefreshToken>(this);

	@Property({ persist: false })
	public get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	public async setPassword(password: string) {
		this.password = await hashPassword(password);
	}
}
