import React, { useState } from 'react';
import {Button, Box, Container, CssBaseline,Typography,} from "@mui/material";

export const Game = () => {
    //let pregunta = "pregunta nº 1";
    //let respuestas = ["respuesta1", "respuesta2", "respuesta3", "respuesta4"];

    const [pregunta, setPregunta] = useState();
    const [respuestas, setRespuestas] = useState();
    const [correcta, setCorrecta] = useState();

    const obtenerPregunta = () => {
        setPregunta("pregunta nº 1");
        setRespuestas(["respuesta1", "respuesta2", "respuesta3", "respuesta4"]); 
        setCorrecta("respuesta1");
    };

    const comprobarPregunta = () => {
        setPregunta("pregunta nº 2");
    };

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
                <Typography component="h1" variant="h5">
                    {obtenerPregunta()}
                    {pregunta}
                </Typography>
            </Box>
            <Box sx={{
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ul>
                    {
                        respuestas.map((respuesta, indice) => {
                            return (<li key={indice}>
                                {respuesta}
                            </li>)
                        })
                    }
                </ul>
            </Box>
            <Box sx={{
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "right",
                }}
            >
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ e => comprobarPregunta()}
                >
                    Comprobar
                </Button>
            </Box>
        </Container>
    </Container>
  )
}

export default Game;