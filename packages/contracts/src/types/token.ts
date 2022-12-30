import { RoleType, TokenType } from "../enums";

export interface BaseTokenData {
	userId: string;
	type: TokenType;
}

export interface AccessTokenData extends BaseTokenData {
	role: {
		id: string;
		type: RoleType;
	};
	roles: RoleType[];
}
