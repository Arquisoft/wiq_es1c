// src/components/Login.js
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
import { Link, Navigate } from "react-router-dom";
import { login } from "../../services/user.service";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => 
{

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  //Error handling
  const [error, setError] = useState('');

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if ( username !== '' && password !== '' )
    {
      setError('');
      setValidUsername(true);
      setValidPassword(true);

      setLoading(true)
      const res = await login(username, password);

      if (res !== ''){
        setLoading(false)
        setError(res);
      }else{
        setLoggedIn(true);
      }

      return;
    }

    if ( username === '' )
      setValidUsername(false);
      
    if ( password === '' )
      setValidPassword(false);
  }

  const checkUsername = (e) =>
  {
    setUsername(e.target.value.trim());
    setValidUsername(true);
  }

  const checkPassword = (e) =>
  {
    setPassword(e.target.value.trim());
    setValidPassword(true);
  }

  return (
    <>
    { loggedIn 
    ?
    ( <Navigate to='/home' replace /> )
    :
    ( <Container 
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={ handleSubmit }
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
              autoFocus
              onChange={ checkUsername }
              error={!validUsername}
              helperText={validUsername ? '' : 'Debes introducir tu nombre de usuario'}
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
              error={!validPassword}
              helperText={validPassword ? '' : 'Debes introducir tu contraseña'}
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
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <span></span>
                </Link>
              </Grid>
              <Grid item>
                <Link to={ '/register' } className="underline text-blue-600 hover:text-blue-900">
                  {"¿No tienes una cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container> )}
    </>
  );
};

export default Login;
