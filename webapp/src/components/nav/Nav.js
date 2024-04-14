import React from "react";
import Swal from "sweetalert2";

import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Lang } from "/lang/Lang";
import { Settings } from "/settings/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";

export const Nav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getColor = () => {
    const htmlElement = document.querySelector("html");
    // console.log("Is dark? " + htmlElement.classList.contains("dark"))
    return htmlElement.classList.contains("dark")? "white" : "black";
  };

  const [openMenuAccount, setOpenMenuAccount] = React.useState(false);
  const [userAnchor, setUserAnchor] = React.useState(undefined);
  const [color, setColor] = React.useState(getColor());

  const handleMenuAccountOpen = (event) => {
    setUserAnchor(event.currentTarget);
    setOpenMenuAccount(true);
  };

  const handleMenuAccountClose = () => {
    setOpenMenuAccount(false);
  };

  const logout = () => {
    // Close menus just in case
    handleMenuAccountClose();
    //Clean the token
    console.log("Token: ", localStorage.getItem("token"))
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logging off!")
    console.log("Token: ", localStorage.getItem("token"))
  };

  const showAlert = () => {
    //Check if we are in a game
    let path = location.pathname;

    console.log("Going home")
    console.log("Current path: " + path)

    if (path != "/game")
      navigate("/home");
    else if (path === "/game") {
      Swal.fire({
        title: t("Nav.alertTitle"),
        text: t("Nav.alertText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("Nav.alertConfirm"),
        cancelButtonText: t("Nav.alertCancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    } else {
      if (location.pathname !== "/home") {
        navigate("/home");
      }
    }
  };

  const history = () => {
    // Close submenu
    handleMenuAccountClose();
    navigate("/history");
    console.log("Going to history")
    console.log("Token: ", localStorage.getItem("token"))
  };

  const profile = () => {
    // Close submenu
    handleMenuAccountClose();
    navigate("/profile");
    console.log("Going to profile")
    console.log("Token: ", localStorage.getItem("token"))
  };

  const changeTheme = () => {
    const htmlElement = document.querySelector("html");

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      setColor("black");
    } else {
      htmlElement.classList.add("dark");
      setColor("white");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-teal-50 dark:bg-zinc-800">
          <IconButton size="large" color="inherit" onClick={showAlert} data-testid="go-home">
            <HomeIcon style={{ color: color }} />
          </IconButton>

          {/* Título */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: color }}
          >
            WIQ
          </Typography>

          <IconButton onClick={changeTheme} size="large" color="inherit" data-testid="change-color">
            <NightlightIcon style={{ color: color }} />
          </IconButton>

          <Lang
            userAnchor={userAnchor}
            setUserAnchor={setUserAnchor}
            color={color}
          />

          <Settings
            userAnchor={userAnchor}
            setUserAnchor={setUserAnchor}
            color={color}
          />

          {/* Botón de cuenta */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="account-appbar"
            aria-haspopup="true"
            onClick={handleMenuAccountOpen}
            color="inherit"
            data-testid="open-account-menu"
          >
            <AccountCircle style={{ color: color }} />
          </IconButton>

          <Menu
            id="account-appbar"
            open={openMenuAccount}
            onClose={handleMenuAccountClose}
            anchorEl={userAnchor}
          >
            <MenuItem onClick={profile} data-testid="go-profile">Perfil</MenuItem>
            <MenuItem onClick={history} data-testid="go-history">Historial</MenuItem>
          </Menu>

          <IconButton
            size="large"
            color="inherit"
            onClick={logout}
            data-testid="logout"
          >
            <LogoutIcon style={{ color: color }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
