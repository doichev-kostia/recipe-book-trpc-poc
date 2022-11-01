import React from "react";
import { trpc } from "../utils/trpc";

const HomePage = () => {
	const response = trpc.getUser.useQuery("adsfadfaf");
	if (!response.data) return <div>Loading...</div>;
	return (
		<div>
			<h1>{response.data.name}</h1>
		</div>
	);
};

export default HomePage;
