export const RoleType = {
	admin: "admin",
	user: "user",
} as const;

export type RoleType = typeof RoleType[keyof typeof RoleType];

export const TokenType = {
	refresh: "refresh",
	access: "access",
	invite: "invite",
} as const;

export type TokenType = typeof TokenType[keyof typeof TokenType];
