import React from "react";
import { Header } from "./Header";

type LayoutProps = {
	children: React.ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<Header />
			<main className="px-4">{children}</main>
		</div>
	);
};
