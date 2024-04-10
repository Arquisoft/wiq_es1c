import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import {Button, Box, Container, CssBaseline,Typography, Grid, Paper, LinearProgress,} from "@mui/material";
import bannerDark from '../../media/wiq_banner.png';
import { startNewGame, nextQuestion, awnser, getEndTime, getGameSettings } from "../../services/game.service";
import { Nav } from '../nav/Nav';
import {useLocation} from "react-router-dom";
import Swal from 'sweetalert2';

export const Game = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    let basicGameSetting = undefined;

    const [pregunta, setPregunta] = useState("Cargando pregunta...");
    const [questionImage, setQuestionImage] = useState("");
    const [respuestas, setRespuestas] = useState(["...","...","...","..."]);
    const [loading, setLoading] = useState(true);
    const [gameDone, setGameDone] = useState(true);
    const [time , setTime] = useState(undefined);
    const [remTime, setRemTime] = useState(0);
    const location = useLocation();

    const comprobarPregunta = (respuesta) => {
        awnser(token, respuesta).then((correcta) => {
            if(respuesta === correcta){
                const botonCorrecto = document.getElementById(correcta);
                botonCorrecto.className = "bg-green-700 w-full containedButton text-black dark:text-white font-mono";
            }else{
                const botonCorrecto = document.getElementById(correcta);
                const botonIncorrecto = document.getElementById(respuesta);
                if(botonCorrecto!==null)
                    botonCorrecto.className = "bg-green-700 w-full containedButton text-black dark:text-white font-mono";

                if(botonIncorrecto !== null)
                botonIncorrecto.className = "bg-red-700 w-full containedButton text-black dark:text-white font-mono";
            }
            
            setGameDone(gameDone => {
                if(!gameDone)
                    setTimeout(loadNextQuestion, 1000);
                else {
                    setTime(undefined);
                    setTimeout(() => 
                        Swal.fire({
                            customClass: {
                                container: "bg-white dark:bg-dark-mode text-black dark:text-white ",
                                confirmButton: "text-black dark:text-white ",
                                cancelButton: "text-black dark:text-white " ,
                            },
                            title: "El juego ha finalizado!",
                            text: "Gracias por jugar",
                            imageUrl: bannerDark,
                            showCancelButton: true,
                            confirmButtonColor: "#f384f6",
                            cancelButtonColor: "#e8b260",
                            confirmButtonText: "Volver al menu principal",
                            cancelButtonText: "Continuar jugando"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/home")
                            }else {
                                window.location.reload(false);
                            }
                        }
                    ), 1000);
                }
                return gameDone;
            });
        })  
    };

    const loadDurationQuestion = () =>
    {
        getGameSettings(token).then( settings => {
            basicGameSetting = settings;
        });
    }

    const loadNextQuestion = () => {
        setPregunta("Cargando pregunta...")
        setQuestionImage("");
        setRespuestas(["...","...","...","..."])
        setLoading(true);
        
        document.querySelectorAll('*[data-buton="btn"]').forEach((btn) => {
            btn.className = "bg-cyan-200 dark:bg-purple-700 w-full containedButton text-black dark:text-white font-mono";    
        })

        nextQuestion(token).then((respuesta) => {
            setPregunta(respuesta.title);
            setQuestionImage(respuesta.imageUrl);
            setRespuestas(respuesta.awnsers);
            setLoading(false);
        });
    }

    //Call start only once
    useEffect(() => {
        let interval = setInterval(() => {
            setTime(time => {
                    if(time !== undefined){
                        let total = basicGameSetting.durationQuestion * 1000 * basicGameSetting.numberOfQuestions;
                        let trans = (new Date().getTime()) - time.start;

                        let percentage =  (trans/total) * 100;
                        let invertedPercentage = 100 - Number(percentage);
                        
                        setRemTime((invertedPercentage/100)*100);

                        if(percentage > 100){
                            comprobarPregunta("");
                            time = undefined;
                        }
                    }
                return time;
            });
        }, 20);

        let tags = "";

        if(location.state != null)
            tags = location.state.tags ?? "";

        startNewGame(token, tags).then(() =>
        {
            loadNextQuestion();
        })

        // Init duration question
        loadDurationQuestion();

        return () => {
            clearInterval(interval);
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
                
                className="text-black dark:text-white "
                
            >

                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 30,
                        marginBottom: 3,
                        
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    className="text-black dark:text-white bg-cyan-200 dark:bg-purple-700"
                >
                    <Typography data-testid="counter" variant="h2" component="h2" className="text-black dark:text-white " >
                        { Math.min(Math.max(Number(remTime/1).toFixed(0),0),10000) }
                    </Typography>
                </Box>
                <Typography fontFamily="monospace" component="h1" variant="h5" className="text-black dark:text-white " 
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
            }}
            className="text-black dark:text-white "
            >
                <LinearProgress  color='inherit' variant={loading? "indeterminate" : "determinate"} value={remTime}  />
            </Box>
        </Container>
    </Container>
    </>
  )
}

export default Game;