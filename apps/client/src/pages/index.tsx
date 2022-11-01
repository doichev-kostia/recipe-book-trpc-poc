import React from "react";
import { trpc } from "../utils/trpc";

const HomePage = () => {
	const response = trpc.users.getUser.useQuery();
	if (!response.data) return <div>Loading...</div>;

	const { mutate: register } = trpc.authentication.register.useMutation();

	const handleRegister = () => {
		register(
			{
				email: "kostia@gmail.com",
				password: "123456453",
			},
			{
				onSuccess: (data) => {
					console.log(data);
				},
				onError: (error) => {
					console.log(error);
				},
			}
		);
	};

	return (
		<div>
			<h1>{response.data.name}</h1>
			<div>
				<button onClick={handleRegister}>Register</button>
			</div>
		</div>
	);
};

export default HomePage;
