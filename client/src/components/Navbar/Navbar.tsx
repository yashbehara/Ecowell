import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "constants/constants";
import Logo from "assets/image2vector.svg";
import { Icon } from "@mui/material";
import AppLogo from "components/AppLogo";

const settings: string[] = ["Update Profile", "Logout"];
const notifications: string[] = [
  "Notification 1",
  "Notification 2",
  "Notification 3",
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);
  const [showDropDownOptions, setShowDropDownOptions] =
    useState<boolean>(false);
  const [redirectTo, setRedirectTo] = useState<string>("");
  const navigate = useNavigate();

  const userDetails = useSelector(
    (state: any) => state.LandingPageReducer.userDetails
  );

  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    navigate(APP_ROUTES.LANDING_ROUTE);
    localStorage.removeItem("account-details");
    handleCloseUserMenu();
  };

  const handleUpdateUserProfile = () => {
    navigate("/update-user-profile");
    handleCloseUserMenu();
  };

  function handleMenuItemClick(setting: string) {
    switch (setting) {
      case "Update Profile":
        return handleUpdateUserProfile;
      case "Logout":
        return handleLogout;
      default:
        return handleCloseUserMenu;
    }
  }

  //navbar components conditional based on route params
  useEffect(() => {
    setShowDropDownOptions(
      [...Object.values(APP_ROUTES).splice(2)].includes(
        window.location.pathname
      )
    );
  }, [window.location.pathname]);

  useEffect(() => {
    setRedirectTo(
      localStorage.getItem("account-details") == null ||
        Object.keys(userHealthDetails).length == 0
        ? APP_ROUTES.LANDING_ROUTE
        : APP_ROUTES.HOMEPAGE_ROUTE
    );
  }, [navigate, userHealthDetails]);

  //navbar component

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#FFEAD5" }}>
      <Toolbar disableGutters>
        <Link to={redirectTo} style={{ textDecoration: "none" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppLogo />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".2rem",
                color: "#581845",
                textDecoration: "none",
              }}
            >
              ECOWELL
            </Typography>
          </span>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {showDropDownOptions && (
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            {/* Removed notification icon code from here */}

            <Tooltip title="User Menu">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "inherit" }}
              >
                <Avatar>{userDetails?.name?.split("")[0] || " "}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleMenuItemClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
