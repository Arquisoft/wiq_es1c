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

export default function MenuAppBar() {
  const [menuJuegosAnchorEl, setMenuJuegosAnchorEl] = React.useState(null);
  const [menuCuentaAnchorEl, setmenuCuentaAnchorEl] = React.useState(null);

  const handleMenuJuegosOpen = (event) => {
    setMenuJuegosAnchorEl(event.currentTarget);
  };

  const handleMenuJuegosClose = () => {
    setMenuJuegosAnchorEl(null);
  };

  const handleMenuAccountOpen = (event) => {
    setmenuCuentaAnchorEl(event.currentTarget);
  };

  const handleMenuAccountClose = () => {
    setmenuCuentaAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Botón de menú */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuJuegosOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuJuegosAnchorEl}
            open={Boolean(menuJuegosAnchorEl)}
            onClose={handleMenuJuegosClose}
          >
            <MenuItem onClick={handleMenuJuegosClose}>Juego1</MenuItem>
            <MenuItem onClick={handleMenuJuegosClose}>Juego2</MenuItem>
          </Menu>

          {/* Título */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WIQ
          </Typography>

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
            <MenuItem component={Link} to="/login" >Desconectarse</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}