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
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getColor = () => {
    const htmlElement = document.querySelector("html");
    console.log("Is dark? " + htmlElement.classList.contains("dark"))
    return htmlElement.classList.contains("dark")? "white" : "black";
  };

  const [openMenu, setOpenMenu] = React.useState(false);
  const [userAnchor, setUserAnchor] = React.useState(undefined);
  const [color, setColor] = React.useState(getColor());

  const handleMenuAccountOpen = (event) => {
    setUserAnchor(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuAccountClose = () => {
    setOpenMenu(false);
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

  const openSettings = () => {
    navigate("/settings");
  }

  const showAlert = () => {
    //Check if we are in a game
    let path = location.pathname;

    console.log("Going home")
    console.log("Current path: " + path)

    if (path != "/game")
      navigate("/home");
    else if (path === "/game") {
      Swal.fire({
        title: "¿Quieres volver a la pantalla de inicio?",
        text: "Terminará tu partida.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí,salir",
        cancelButtonText: "No,continuar jugando",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
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
          <Typography
            variant="p"
            component="div"
            style={{ color: color, marginLeft: 15 }}
          >
          <a href="https://github.com/Arquisoft/wiq_es1c" target="_blank" rel="noopener noreferrer"> Sobre nosotros</a>
          </Typography>
          <IconButton size="large" color="inherit" data-testid="change-color">
            <NightlightIcon onClick={changeTheme} style={{ color: color }} />
          </IconButton>

          <IconButton size="large" color="inherit" data-testid="go-settings">
            <SettingsIcon onClick={openSettings} style={{ color: color }} />
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
            open={openMenu}
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
