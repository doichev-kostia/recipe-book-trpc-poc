import React from "react";
import { useForm } from "react-hook-form";
import { RegisterBody } from "@trpc-poc/contracts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";

const RegistrationSchema = RegisterBody.extend({
	passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ["passwordConfirmation"], // path of error
});

type Values = z.infer<typeof RegistrationSchema>;

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Values>({
		resolver: zodResolver(RegistrationSchema),
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="flex gap-4 mb-3">
					<TextField
						label="First Name"
						{...register("firstName", { required: true })}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
					/>
					<TextField
						label="Last Name"
						{...register("lastName", { required: true })}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
					/>
				</div>
				<div className="flex gap-4 mb-3">
					<TextField
						label="Email"
						{...register("email", { required: true })}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						label="Password"
						{...register("password", { required: true })}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<TextField
						label="Confirm Password"
						{...register("passwordConfirmation", {
							required: true,
						})}
						error={!!errors.passwordConfirmation}
						helperText={errors.passwordConfirmation?.message}
					/>
				</div>
				<div className="flex justify-center">
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
