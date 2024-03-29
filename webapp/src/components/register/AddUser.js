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
import { Link, Navigate } from "react-router-dom";
import { register } from "../../services/user.service";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddUser = () => 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const doRegister = async (e) => {
    e.preventDefault();

    if ( username !== '' && password !== '' && password === confirmPassword )
    {
      setError('');
      setValidUsername(true);
      setValidPassword(true);
      
      setLoading(true);
      const error = await register(username,password)

      if (error !== ''){
        setLoading(false);
        setError(error);
      } else {
        setLoggedIn(true);
      }

      return;
    }

    if ( username === '' )
      setValidUsername(false);
      
    if ( password === '' )
      setValidPassword(false);

    if ( password !== confirmPassword )
      setValidConfirmPassword(false);
  }

  const checkUsername = (e) =>
  {
    setUsername(e.target.value.trim());
  }

  const checkPassword = (e) =>
  {
    setPassword(e.target.value.trim());
  }

  const checkConfirmPassword = (e) =>
  {
    setConfirmPassword(e.target.value.trim());
  }
  
  return (
    <>
    { loggedIn
    ?
    ( <Navigate to='/home' /> )
    :
    ( <Container 
      component="main"
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
      className="min-h-screen flex justify-center align-middle"
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
              error={!validUsername}
              helperText={validUsername ? '' : 'Debes introducir tu nombre de usuario'}
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
              error={!validPassword}
              helperText={validPassword ? '' : 'Debes introducir una contraseña'}
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
              onChange={ checkConfirmPassword }
              error={!validConfirmPassword}
              helperText={validConfirmPassword ? '' : 'Las contraseñas no coinciden'}
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
    </Container> )}
    </>
  );
};

export default AddUser;
