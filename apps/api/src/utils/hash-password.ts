// The library doesn't provide named exports
import pkg from "bcryptjs";

const { hash } = pkg;

export const hashPassword = (password: string) => {
	return hash(password, 10);
};
