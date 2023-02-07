import { trpc } from "@/utils/trpc";
import React from "react";
import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
	useNavigation,
	useParams,
	useSubmit,
} from "react-router-dom";
import { z } from "zod";
import Avatar from "@mui/material/Avatar";
import { Button, Skeleton, TextField } from "@mui/material";
import { getFullName } from "@/utils/helpers";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { EditUserBody, UserView } from "@trpc-poc/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FILE_INPUT_NAME } from "@/constants";

const ParamsSchema = z.object({
	userId: z.string(),
});

type Values = z.infer<typeof EditUserBody>;

const useProfileParams = () => {
	const params = useParams<z.infer<typeof ParamsSchema>>();

	return ParamsSchema.parse(params);
};

export const loader =
	(utils: ReturnType<typeof trpc.useContext>): LoaderFunction =>
	async ({ params }): Promise<z.infer<typeof UserView>> => {
		const { userId } = ParamsSchema.parse(params);

		return (
			utils.users.getUser.getData(userId) ??
			(await utils.users.getUser.fetch(userId))
		);
	};

export const useProfileLoaderData = () => {
	return UserView.parse(useLoaderData());
};

export const action =
	(utils: ReturnType<typeof trpc.useContext>): ActionFunction =>
	async ({ params, request }) => {
		const { userId } = ParamsSchema.parse(params);

		const formData = await request.formData();

		const response = await fetch(
			`${import.meta.env.VITE_API_BASE_URL}/api/files/upload`,
			{
				method: "POST",
				body: formData,
			}
		);

		const body = await response.json();

		const { fileUrl } = z
			.object({
				fileUrl: z.string(),
			})
			.parse(body);

		const user = await utils.client.users.uploadPicture.mutate({
			userId,
			fileUrl,
		});

		await utils.users.getUser.invalidate();
		return user;
	};

const ProfilePage = () => {
	const user = useProfileLoaderData();
	const submit = useSubmit();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	const { mutate: updateUser } = trpc.users.updateUser.useMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Values>({
		resolver: zodResolver(EditUserBody),
	});

	const fetcher = useFetcher();

	const onSubmit = handleSubmit((data) => {
		updateUser({
			id: user.id,
			data,
		});
	});

	return (
		<section>
			<div>
				<Typography variant="h1" className="mb-5 text-4xl">
					Profile
				</Typography>
			</div>
			<fetcher.Form
				method="post"
				className="mb-5"
				encType="multipart/form-data"
			>
				{!isLoading ? (
					<Avatar
						alt={getFullName(user?.firstName, user?.lastName)}
						src={user?.avatarUrl ?? undefined}
					>
						{getFullName(user?.firstName, user?.lastName)[0]}
					</Avatar>
				) : (
					<Skeleton width={40} height={40} variant="circular" />
				)}
				<input
					className="mt-3"
					type="file"
					name={FILE_INPUT_NAME}
					multiple={false}
					accept="image/png, image/jpeg"
					onChange={(e) => {
						submit(e.currentTarget.form);
					}}
				/>
			</fetcher.Form>
			<form onSubmit={onSubmit} className="max-w-md">
				<div className="grid grid-flow-col gap-4 mb-3">
					<TextField
						label="First Name"
						{...register("firstName", { required: true })}
						defaultValue={user.firstName}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
						disabled={isLoading}
					/>
					<TextField
						label="Last Name"
						{...register("lastName", { required: true })}
						defaultValue={user.lastName}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
						disabled={isLoading}
					/>
				</div>
				<div className="grid auto-cols-1fr grid-flow-row gap-3 mb-3">
					<TextField
						label="Email"
						{...register("email", { required: true })}
						defaultValue={user.email}
						error={!!errors.email}
						helperText={errors.email?.message}
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
		</section>
	);
};

export default ProfilePage;
