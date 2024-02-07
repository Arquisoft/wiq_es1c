// src/components/AddUser.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";
import { register } from "../../services/user.service";

const AddUser = () => 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const doRegister = async (e) => {
      e.preventDefault();

      let error = await register(username,password)
      setError(error);
  }

  const checkUsername = (e) =>
  {
    setUsername(e.target.value);
  }

  const checkPassword = (e) =>
  {
    setPassword(e.target.value);
  }
  
  return (
    <Container 
      component="main"
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
      className="min-h-screen flex justify-center align-middle"
    >
      <Container
        className="bg-white rounded-lg"
        component="main"
        maxWidth="sm"
      >
        <CssBaseline />
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box
            component="form"
            onSubmit={ doRegister }
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              onChange={ checkUsername }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ checkPassword }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Repetir contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />

            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <span></span>
                </Link>
              </Grid>
              <Grid item>
                <Link to={ '/login' } className="underline text-blue-600 hover:text-blue-900">
                  {"¿Ya tienes unas cuenta? Inicia sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default AddUser;
