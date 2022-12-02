import { expect } from "@jest/globals";
import { HandlerTestBase } from "../utils/handler-test-base";
import { EntityManager } from "@mikro-orm/core";
import { register } from "routes/authentication/procedures/register.procedure";
import { RoleType } from "@trpc-poc/contracts";

describe("Handler test", () => {
	describe("Auth tests", () => {
		let base: HandlerTestBase;
		let em: EntityManager;

		beforeAll(async () => {
			const res = await HandlerTestBase.before();
			base = res.base;
			em = res.em;
		});

		beforeEach(async () => {
			await base.beforeEach();
		});

		it("should create a user", async () => {
			const user = {
				firstName: "John",
				lastName: "Doe",
				email: "test-user@gmail.com",
				password: "password123",
			};

			const { role } = await register(user);
			const u = role.user.toJSON();
			// @ts-ignore
			delete u.password;
			expect(u).toEqual(user);
			expect(role.type).toEqual(RoleType.user);
		});

		afterAll(() => base.after());
		afterEach(() => base.afterEach());
	});
});
