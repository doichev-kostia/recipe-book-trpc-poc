import React from "react";
import { trpc } from "../utils/trpc";

const AboutPage = () => {
	const { mutate } = trpc.authentication.register.useMutation();

	const handleSubmit = () => {
		mutate({
			firstName: "John",
			lastName: "Doe",
		});
	};

	return (
		<div>
			<h1>About</h1>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};

export default AboutPage;
