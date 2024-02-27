import React, { useState, useRef, useEffect } from 'react';
import {Button, Box, Container, CssBaseline,Typography,} from "@mui/material";
import './Game.css';
import { startNewGame, nextQuestion, awnser } from "../../services/game.service";

export const Game = () => {
    const token = localStorage.getItem("token");

    const [pregunta, setPregunta] = useState("Cargando pregunta...");
    const [respuestas, setRespuestas] = useState(["...","...","...","..."]);

    const boxRefs = useRef([]);

    const startGame = () => {
        startNewGame(token).then(() =>
            nextQuestion(token).then((respuesta) => {
                setPregunta(respuesta.title);
                setRespuestas(respuesta.awnsers);
            })
        );
    };

    const comprobarPregunta = () => {

        let respuesta = null;

        boxRefs.current.forEach((boxRef, indice) => {
            if(boxRef.dataset.state === "selected"){
                respuesta = boxRef.dataset.question;
                boxRef.dataset.state = "unselected";
            }
        });

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

    const seleccionarRespuesta = (element) => {
        boxRefs.current.forEach((boxRef, indice) => {
            boxRef.dataset.state = "unselected";
        });
        
        element.target.dataset.state = "selected";
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
                            return (
                                <Box data-question={respuesta} data-state='unselected'
                                 sx={{
                                    padding: 1,
                                    margin: 1,
                                    border: '2px solid blue',
                                    borderRadius: '10px',
                                }}
                                onClick={e => seleccionarRespuesta(e)}
                                ref={(e) => (boxRefs.current[indice] = e)}
                            >
                                <li key={indice}>
                                {respuesta}
                                </li>
                            </Box>
                            
                            )
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