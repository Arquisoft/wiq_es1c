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
import { Link, useNavigate  } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';

export const Nav = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = React.useState(false);

  const handleMenuAccountOpen = (event) => {
    setOpenMenu(true);
  };

  const handleMenuAccountClose = () => {
    setOpenMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="account-appbar"
            open={openMenu}
            onClose={handleMenuAccountClose}
          >
            <MenuItem onClick={handleMenuAccountClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuAccountClose}>Historial</MenuItem>
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