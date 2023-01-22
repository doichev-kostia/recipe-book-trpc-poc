import React from "react";
import { useForm } from "react-hook-form";
import { RegisterBody } from "@trpc-poc/contracts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { trpc } from "../utils/trpc";

const RegistrationSchema = RegisterBody.extend({
	passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ["passwordConfirmation"], // path of error
});

type Values = z.infer<typeof RegistrationSchema>;

const SignUp = () => {
	const { mutate: registerUser, isLoading } =
		trpc.authentication.register.useMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Values>({
		resolver: zodResolver(RegistrationSchema),
	});

	const onSubmit = handleSubmit((data) => {
		registerUser(data);
	});

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="grid grid-flow-col gap-4 mb-3">
					<TextField
						label="First Name"
						{...register("firstName", { required: true })}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
						disabled={isLoading}
					/>
					<TextField
						label="Last Name"
						{...register("lastName", { required: true })}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
						disabled={isLoading}
					/>
				</div>
				<div className="grid auto-cols-1fr grid-flow-row gap-3 mb-3">
					<TextField
						label="Email"
						{...register("email", { required: true })}
						error={!!errors.email}
						helperText={errors.email?.message}
						disabled={isLoading}
					/>
					<TextField
						label="Password"
						type="password"
						{...register("password", { required: true })}
						error={!!errors.password}
						helperText={errors.password?.message}
						disabled={isLoading}
					/>
					<TextField
						label="Confirm Password"
						type="password"
						{...register("passwordConfirmation", {
							required: true,
						})}
						error={!!errors.passwordConfirmation}
						helperText={errors.passwordConfirmation?.message}
						disabled={isLoading}
					/>
				</div>
				<div className="flex justify-center">
					<Button
						variant="contained"
						type="submit"
						disabled={isLoading}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
