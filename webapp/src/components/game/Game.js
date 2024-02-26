import React, { useState, useRef } from 'react';
import {Button, Box, Container, CssBaseline,Typography,} from "@mui/material";
import './Game.css';

export const Game = () => {
    //let pregunta = "pregunta nº 1";
    //let respuestas = ["respuesta1", "respuesta2", "respuesta3", "respuesta4"];

    const [pregunta, setPregunta] = useState("pregunta nº 1");
    const [respuestas, setRespuestas] = useState(["respuesta1", "respuesta2", "respuesta3", "respuesta4"]);
    const [correcta, setCorrecta] = useState(1);

    const boxRefs = useRef([]);

    const comprobarPregunta = () => {

        boxRefs.current.forEach((boxRef, indice) => {
            if(boxRef.dataset.state === "selected"){
                if(boxRef.dataset.question == correcta){
                    alert("Pregunta acertada");
                }else{
                    alert("Pregunta fallada");
                }
                boxRef.dataset.state = "unselected";
            }
        });


        setPregunta("pregunta nº 2");
        setCorrecta(2);
    };

    const seleccionarRespuesta = (element) => {
        boxRefs.current.forEach((boxRef, indice) => {
            boxRef.dataset.state = "unselected";
        });
        
        element.target.dataset.state = "selected";

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
                                <Box data-question={indice} data-state='unselected'
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