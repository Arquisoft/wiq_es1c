import React, { useState, useEffect } from "react";
import { Nav } from "../nav/Nav";
import { Autocomplete, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUsers } from "../../services/user.service";

export const Friends = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users.map(user => user.name))
    })
  },[])

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "85vh",
          }}
          className="min-h-screen flex justify-center align-middle"
        >
          <Container
            className="bg-teal-50 dark:bg-zinc-800 rounded-lg flex"
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
                  <Typography className="text-black dark:text-white ">Amigos</Typography>
              </Box>
              <Box
                  sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                  }}
                  
              >
                  <Typography className="text-black dark:text-white ">Peticiones de amistad recibidas</Typography>
              </Box>
              <Box
                  sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                  }}
                  
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={users}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Buscar usuarios" />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="outlined">Enviar peticion</Button>
                  </Grid>
                </Grid>
              </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};
