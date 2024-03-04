import React, { useState, useRef, useEffect } from 'react';
import {Button, Box, Container, CssBaseline,Typography, Grid, Paper,} from "@mui/material";
import './Game.css';
import { startNewGame, nextQuestion, awnser } from "../../services/game.service";

export const Game = () => {
    const token = localStorage.getItem("token");

    const [pregunta, setPregunta] = useState("Cargando pregunta...");
    const [respuestas, setRespuestas] = useState(["...","...","...","..."]);

    const startGame = () => {
        startNewGame(token).then(() =>
            nextQuestion(token).then((respuesta) => {
                setPregunta(respuesta.title);
                setRespuestas(respuesta.awnsers);
            })
        );
    };

    const comprobarPregunta = (respuesta) => {
        awnser(token, respuesta).then((correcta) => {

            if(respuesta == correcta){
                alert("Pregunta acertada");
            }else{
                alert("Pregunta fallada");
            }
    
            nextQuestion(token).then((respuesta) => {
                setPregunta(respuesta.title);
                setRespuestas(respuesta.awnsers);
            });
        })
    };

    //Call start only once
    useEffect(startGame, []) // DO NOT REMOVE THE EMPTY ARRAY, THE APP WILL BREAK!!!!

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
                    {pregunta}
                </Typography>
            </Box>

            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid container spacing={2}>
                    {
                        respuestas.map((respuesta, position) => (
                            <Grid item key={position} xs={6}> 
                                <Paper>
                                    <Button 
                                        fullWidth
                                        variant="contained"
                                        onClick={comprobarPregunta.bind(this, respuesta)}
                                    >
                                        {respuesta}
                                    </Button>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    </Container>
  )
}

export default Game;