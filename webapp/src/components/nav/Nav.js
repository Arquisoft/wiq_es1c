import * as React from 'react';
import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  MenuIcon,
  AccountCircle,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

export default function MenuAppBar() {
 
  const [menuCuentaAnchorEl, setmenuCuentaAnchorEl] = React.useState(null);

  

  const handleMenuAccountOpen = (event) => {
    setmenuCuentaAnchorEl(event.currentTarget);
  };

  const handleMenuAccountClose = () => {
    setmenuCuentaAnchorEl(null);
  };

  const logout = async () => {
    await localStorage.system("token",null);
    {Link} to ="/login"
  };

  const goHome = ()=>{
    {Link} to ="/home"
  };
  const doNothing = ()=>{

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            color="inherit"
            onClick={goHome}
          >
            <HomeIcon />
          </IconButton>
         

          {/* Título */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WIQ
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            onClick={doNothing}
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
            anchorEl={menuCuentaAnchorEl}
            open={Boolean(menuCuentaAnchorEl)}
            onClose={handleMenuAccountClose}
          >
            <MenuItem onClick={handleMenuAccountClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuAccountClose}>Historial</MenuItem>
          </Menu>
          <IconButton
            size="large"
            color="inherit"
            onClick={logout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}