import React from "react";
import { z } from "zod";
import { LoginBody, RoleType } from "@trpc-poc/contracts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { trpc } from "../utils/trpc";

type Values = z.infer<typeof LoginBody>;

const SignIn = () => {
	const { mutate: login } = trpc.authentication.login.useMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Values>({
		resolver: zodResolver(LoginBody),
	});

	const onSubmit = handleSubmit((data) => {
		login({
			...data,
			role: RoleType.user,
		});
	});

	return (
		<section>
			<Typography variant="h1" className="mb-5 text-4xl">
				Sign In
			</Typography>
			<form
				onSubmit={onSubmit}
				className="grid grid-flow-row gap-4 max-w-md mx-auto"
			>
				<FormControl fullWidth error={!!errors.role}>
					<InputLabel id="role-label">Role</InputLabel>
					<Select
						labelId="role-label"
						id="role"
						label="Age"
						{...register("role", { required: true })}
					>
						<MenuItem value="" disabled>
							Choose role
						</MenuItem>
						<MenuItem value="admin">Admin</MenuItem>
						<MenuItem value="user">User</MenuItem>
					</Select>
					<FormHelperText>
						{errors.email?.message ?? ""}
					</FormHelperText>
				</FormControl>
				<TextField
					label="Email"
					{...register("email", { required: true })}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					label="Password"
					type="password"
					{...register("password", { required: true })}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
				<div className="flex justify-center mt-4">
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</section>
	);
};

export default SignIn;
