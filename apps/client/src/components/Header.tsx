import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MenuBook } from "@mui/icons-material";
import { useTokenData } from "@/utils/token";
import { trpc } from "@/utils/trpc";
import { useNavigate } from "react-router-dom";
import { getFullName } from "@/utils/helpers";

const settings = ["Profile", "Logout"] as const;
export const Header = () => {
	const tokenData = useTokenData();
	const isAuthenticated = !!tokenData;

	const navigate = useNavigate();

	const { data: user, isLoading } = trpc.users.getUser.useQuery(
		tokenData?.userId || "",
		{
			enabled: isAuthenticated,
		}
	);

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = (setting: typeof settings[number]) => {
		setAnchorElUser(null);
		if (setting === "Logout") {
			navigate("/sign-out");
		} else if (setting === "Profile" && tokenData) {
			navigate(`/profile/${tokenData.userId}`);
		}
	};
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters className="justify-between">
					<div className="flex items-center gap-4">
						<MenuBook />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Recipes
						</Typography>
					</div>

					{isAuthenticated && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt={getFullName(
											user?.firstName,
											user?.lastName
										)}
										src={user?.avatarUrl ?? undefined}
									>
										{
											getFullName(
												user?.firstName,
												user?.lastName
											)[0]
										}
									</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={() =>
											handleCloseUserMenu(setting)
										}
									>
										<Typography textAlign="center">
											{setting}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
