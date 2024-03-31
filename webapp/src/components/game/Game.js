import React, { useState, useEffect } from 'react';
import {Button, Box, Container, CssBaseline,Typography, Grid, Paper, LinearProgress,} from "@mui/material";
import { startNewGame, nextQuestion, awnser, getEndTime } from "../../services/game.service";
import { Nav } from '../nav/Nav';
import { BasicGame } from '../../settings/settings';

export const Game = () => {
    const token = localStorage.getItem("token");
    const basicGameSetting = BasicGame; // TODO hacer petición get a game settings

    const [pregunta, setPregunta] = useState("Cargando pregunta...");
    const [questionImage, setQuestionImage] = useState("");
    const [respuestas, setRespuestas] = useState(["...","...","...","..."]);
    const [loading, setLoading] = useState(true);
    const [time , setTime] = useState(undefined);
    const [remTime, setRemTime] = useState(0);
    const [seconds, setSeconds] = useState(basicGameSetting.durationQuestion);

    const comprobarPregunta = (respuesta) => {
        awnser(token, respuesta).then((correcta) => {

            if(respuesta === correcta){
                const botonCorrecto = document.getElementById(correcta);
                botonCorrecto.style.backgroundColor = 'green';
            }else{
                const botonCorrecto = document.getElementById(correcta);
                const botonIncorrecto = document.getElementById(respuesta);
                botonCorrecto.style.backgroundColor = 'green';

                if(botonIncorrecto !== null)
                    botonIncorrecto.style.backgroundColor = 'red';
            }

            setTimeout(loadNextQuestion, 1000);
        })  
    };

    const loadNextQuestion = () => {
        setPregunta("Cargando pregunta...")
        setQuestionImage("");
        setRespuestas(["...","...","...","..."])
        setLoading(true);
        setTime(undefined);
        
        document.querySelectorAll('*[data-buton="btn"]').forEach((btn) => {
            btn.style.backgroundColor = 'purple';
        })

        nextQuestion(token).then((respuesta) => {
            setPregunta(respuesta.title);
            setQuestionImage(respuesta.imageUrl);
            setRespuestas(respuesta.awnsers);
            setLoading(false);
            getEndTime(token).then((time) => {
                setTime(time);
                //setSeconds((time.end - time.start) / 1000);
                setSeconds(basicGameSetting.durationQuestion);
            });
        });
    }

    //Call start only once
    useEffect(() => {
        let interval = setInterval(() => {
            setTime(time => {
                if(time !== undefined){
                    //let total = time.end - time.start;
                    let total = basicGameSetting.durationQuestion * 1000;
                    let trans = (new Date().getTime()) - time.start;

                    let percentage =  (trans/total) * 100;
                    let invertedPercentage = 100 - Number(percentage);
                    
                    setRemTime((invertedPercentage/100)*110);

                    if(percentage > 100){
                        comprobarPregunta("");
                        time = undefined;
                    }
                }
                return time;
            });
        }, 20);

        startNewGame(token).then(() =>
            loadNextQuestion()
        );

        let secondsInterval = setInterval( () =>
        {
            setSeconds(seconds => 
            {
                if (seconds > 0)
                    return seconds - 1;

                return seconds
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(secondsInterval);
        }
    }, []) // DO NOT REMOVE THE EMPTY ARRAY, THE APP WILL BREAK!!!!

  return (
    <>
    <Nav/>
    <Container
        component="main"
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "85vh" }}
        className="min-h-screen flex justify-center align-middle"
    >
        <Container
            className="bg-zinc-800 rounded-lg flex"
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
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 30,
                        marginBottom: 3,
                        bgcolor: 'purple',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h2" component="h2" color="white">
                        { seconds }
                    </Typography>
                </Box>
                <Typography fontFamily="monospace" color="white" component="h1" variant="h5" 
                    sx={{
                        paddingBottom: 3,
                    }}
                >
                    {pregunta}
                </Typography>
                {
                    questionImage!==""
                    ?
                    <Paper elevation={20} >
                        <Box
                            component="img"
                            sx={{
                                height: '30vh',
                                width: 'auto',
                            }}
                            src={questionImage}
                        />
                    </Paper>
                    : 
                    <></>
                }
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
                                        id={respuesta}
                                        backgroundColor="purple"
                                        data-buton="btn"
                                        fontFamily="monospace"
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
                <LinearProgress color="secondary" variant={loading? "indeterminate" : "determinate"} value={remTime} />
            </Box>
        </Container>
    </Container>
    </>
  )
}

export default Game;