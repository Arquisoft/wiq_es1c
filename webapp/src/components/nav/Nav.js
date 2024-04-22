import React, { useState } from "react";
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

import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import TranslateIcon from "@mui/icons-material/Translate";
import SettingsIcon from "@mui/icons-material/Settings";
import i18n from "../../i18n";


export const Nav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getColor = () => {
    const htmlElement = document.querySelector("html");
    // console.log("Is dark? " + htmlElement.classList.contains("dark"))
    return htmlElement.classList.contains("dark") ? "white" : "black";
  };

  const [openMenuLanguage, setOpenMenuLanguage] = useState(false);
  const [openMenuAccount, setOpenMenuAccount] = useState(false);
  const [userAnchor, setUserAnchor] = useState(undefined);
  const [color, setColor] = useState(getColor());

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
    console.log("Token: ", localStorage.getItem("token"));
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logging off!");
    console.log("Token: ", localStorage.getItem("token"));
  };

  const showAlert = () => {
    //Check if we are in a game
    let path = location.pathname;

    console.log("Going home");
    console.log("Current path: " + path);

    if (path != "/game") navigate("/home");
    else if (path === "/game" || path === "/suddendeath" || path === "/againstClock") {
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
    console.log("Going to history");
    console.log("Token: ", localStorage.getItem("token"));
  };

  const friends = () => {
    // Close submenu
    handleMenuAccountClose();
    navigate("/friends");
    console.log("Going to friends")
    console.log("Token: ", localStorage.getItem("token"))
  };

  const profile = () => {
    // Close submenu
    handleMenuAccountClose();
    navigate("/profile");
    console.log("Going to profile");
    console.log("Token: ", localStorage.getItem("token"));
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

  const handleMenuLanguageOpen = (event) => {
    setUserAnchor(event.currentTarget);
    setOpenMenuLanguage(true);
  };

  const handleMenuLanguageClose = () => {
    setOpenMenuLanguage(false);
  };

  const spanish = () => {
    handleMenuLanguageClose();

    i18n.changeLanguage("es");
  };

  const english = () => {
    handleMenuLanguageClose();

    i18n.changeLanguage("en");
  };

  const openSettings  = () => {
    navigate("/settings");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-teal-50 dark:bg-zinc-800">
          <IconButton
            size="large"
            color="inherit"
            onClick={showAlert}
            data-testid="go-home"
          >
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

          <IconButton
            onClick={changeTheme}
            size="large"
            color="inherit"
            data-testid="change-color"
          >
            <NightlightIcon style={{ color: color }} />
          </IconButton>

          {/** Lang Icon */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="language"
            aria-controls="language-appbar"
            aria-haspopup="true"
            onClick={handleMenuLanguageOpen}
            data-testid="open-language-menu"
          >
            <TranslateIcon style={{ color: color }} />
          </IconButton>

          <Menu
            id="language-appbar"
            open={openMenuLanguage}
            onClose={handleMenuLanguageClose}
            anchorEl={userAnchor}
          >
            <MenuItem
              selected={i18n.language === "es" ? true : false}
              onClick={spanish}
            >
              <span className="fi fi-es mr-1"></span>
              Español
            </MenuItem>
            <MenuItem
              selected={i18n.language === "en" ? true : false}
              onClick={english}
            >
              <span className="fi fi-gb mr-1"></span>
              Inglés
            </MenuItem>
          </Menu>

          {/** Settings Icon */}
          <IconButton onClick={openSettings} size="large" color="inherit" data-testid="go-settings">
            <SettingsIcon style={{ color: color }} />
          </IconButton>

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
            <MenuItem onClick={friends} data-testid="go-friends">Amigos</MenuItem>

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
