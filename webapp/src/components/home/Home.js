import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Box, Container, CssBaseline,Typography, Button } from "@mui/material";
import { getCurrentUser } from "../../services/user.service";
import banner from '../../media/wiq_banner.png';

export const Home = () => 
{
    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState("No identificado");



    useEffect(() =>
    {
        const token = localStorage.getItem('token');


        setLoggedIn(token !== undefined && token !== null);
    }, [loggedIn]);

    useEffect(() => {
        const fetchUserName = async () => {
            const user = await getCurrentUser();
            setUsername(user);
        };
        fetchUserName();
    }, []);
    
    return (
        <>
        {(
            <Container
                component="main"
                maxWidth="md"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minHeight: "100vh", color:'white', fontFamily:"monospace"}}
                className="min-h-screen flex  justify-center place-content-between"
            > 
                <Container
                    className="bg-zinc-800 rounded-lg flex"
                    component="main"
                    maxWidth="sm"

                >
                    <CssBaseline/>
                    <Box
                        sx={{
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",

                        }}
                    >
                        <img src={banner} alt="WiQ"/>
                        <div className="flex p-4 place-content-between">
                            <Typography component="h2" variant="h4" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                                Home
                            </Typography>

                            <Typography component="h3" variant="h5" fontFamily="monospace" alignSelf="center">
                                ¡Bienvenido, {username}!
                            </Typography>

                        </div>

                        <div className="p-2 m-1">
                            <Typography component="h3" variant="h6" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                                Cómo jugar
                            </Typography>
                            <Typography component="p" variant="p">
                                Cuando pulses en el botón de jugar, se te irán mostrando preguntas junto con 4 posibles
                                respuestas, sólo una de ellas es verdadera, haz click sobre la respuesta correcta para
                                ganar puntos.
                            </Typography>
                            <Typography component="p" variant="p">
                                El tiempo para contestar es limitado. La barra en la parte inferior muestra el tiempo
                                restante. Si el tiempo se termina, la pregunta contará como fallada y se pasará a la
                                siguiente.
                            </Typography>
                            <Typography component="p" variant="h6" fontFamily="monospace" fontWeight="bold" className="text-center p-3">
                                ¡Mucha suerte y demuestra lo que sabes!
                            </Typography>
                        </div>

                        <Link to={'/game'} className="self-center" >
                            <Button variant="contained" size="large"
                                    sx={{
                                        backgroundColor: "purple",
                                        width:"32rem",
                                        height:"3rem",
                                        fontSize:"2rem",
                                        fontWeight:"bold",
                                        fontFamily:"monospace"
                                    }}>
                                Jugar
                            </Button>
                        </Link>

                    </Box>
                </Container>

            </Container>
        )}
        </>
    )
}
