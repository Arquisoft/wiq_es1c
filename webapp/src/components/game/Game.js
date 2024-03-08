import React, { useState, useEffect } from 'react';
import {Button, Box, Container, CssBaseline,Typography, Grid, Paper, LinearProgress,} from "@mui/material";
import './Game.css';
import { startNewGame, nextQuestion, awnser, getEndTime } from "../../services/game.service";

export const Game = () => {
    const token = localStorage.getItem("token");

    const [pregunta, setPregunta] = useState("Cargando pregunta...");
    const [respuestas, setRespuestas] = useState(["...","...","...","..."]);
    const [loading, setLoading] = useState(true);
    const [time , setTime] = useState(undefined);
    const [remTime, setRemTime] = useState(0);

    const startGame = () => {
        startNewGame(token).then(() =>
            loadNextQuestion()
        );
    };

    const comprobarPregunta = (respuesta) => {
        awnser(token, respuesta).then((correcta) => {

            loadNextQuestion();

            if(respuesta == correcta){
                alert("Pregunta acertada");
                this.style.backgroundColor = 'green';
            }else{
                alert("Pregunta fallada");
                this.style.backgroundColor = 'red';
            }
        })
    };

    const loadNextQuestion = () => {
        setPregunta("Cargando pregunta...")
        setRespuestas(["...","...","...","..."])
        setLoading(true);
        setTime(undefined)

        nextQuestion(token).then((respuesta) => {
            setPregunta(respuesta.title);
            setRespuestas(respuesta.awnsers);
            setLoading(false);
            getEndTime(token).then((time) => {
                setTime(time);
            })
        });
    }

    //Call start only once
    useEffect(() => {
        let interval = setInterval(() => {
            setTime((time) => {
                if(time != undefined){
                    let total = time.end - time.start;
                    let trans = (new Date().getTime()) - time.start;

                    let percentage =  (trans/total) * 100;
                    let invertedPercentage = 100 - Number(percentage);
                    
                    setRemTime((invertedPercentage/100)*110);

                    if(percentage > 100){
                        time = undefined;
                        alert("tiempo agotado!");
                        comprobarPregunta("");
                    }
                }
                return time;
            })
        }, 20);

        startGame();

        return () => clearInterval(interval);
    }, []) // DO NOT REMOVE THE EMPTY ARRAY, THE APP WILL BREAK!!!!

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

            <Box sx={{ 
                width: '100%',
                padding: 3
            }}>
                <LinearProgress variant={loading? "indeterminate" : "determinate"} value={remTime} />
            </Box>
        </Container>
    </Container>
  )
}

export default Game;