import React from 'react';

import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, redirect } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';


export const Nav = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [userAnchor, setUserAnchor] = React.useState(undefined);

  const handleMenuAccountOpen = (event) => {
    setUserAnchor(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuAccountClose = () => {
    setOpenMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    redirect("/login");
  }


  const history = () => {
    handleMenuAccountClose();
    redirect("/history");
  }
  
  const changeTheme = () => {
    const htmlElement = document.querySelector('html');

    if (htmlElement.classList.contains('dark')) 
      htmlElement.classList.remove('dark');
    else
      htmlElement.classList.add('dark');
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className="bg-zinc-800">
          <Link to='/home' >
            <IconButton
                size="large"
                color="inherit"
            >
              <HomeIcon />
            </IconButton>
          </Link>
         

          {/* Título */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WIQ
          </Typography>

          <IconButton
            size='large'
            color='inherit'
            onClick={ changeTheme }
          >
            <NightlightIcon />
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
          >
            <SettingsIcon />
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
            <AccountCircle />
          </IconButton>

          <Menu
            id="account-appbar"
            open={openMenu}
            onClose={handleMenuAccountClose}
            anchorEl={userAnchor}
          >
              <MenuItem onClick={handleMenuAccountClose}>Perfil</MenuItem>
              <MenuItem onClick={history}>Historial</MenuItem>
          </Menu>

          <IconButton
            size="large"
            color="inherit"
            onClick={logout}
            data-testid="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}