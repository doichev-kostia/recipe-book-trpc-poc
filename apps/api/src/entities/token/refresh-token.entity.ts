import { Entity, ManyToOne } from "@mikro-orm/core";
import { TokenType } from "@trpc-poc/contracts";

import { Token } from "./token.entity.js";
import { User } from "../user.entity.js";

@Entity({
	discriminatorValue: TokenType.refresh,
})
export class RefreshToken extends Token {
	@ManyToOne(() => User)
	public user: User;
}
