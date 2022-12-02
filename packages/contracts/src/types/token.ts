import { RoleType } from "../enums/role-type";
import { TokenType } from "../enums/token-type";

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
