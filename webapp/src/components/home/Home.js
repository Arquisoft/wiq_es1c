import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Box, Container, CssBaseline,Typography } from "@mui/material";
import { getCurrentUser } from "../../services/user.service";
import { Nav } from '../nav/Nav';
import './Home.css';

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

        <Nav/>
        {(
            <Container
                component="main"
                maxWidth="md"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minHeight: "85vh", color:'white', fontFamily:"monospace"}}
                className=" min-h-screen flex  justify-center place-content-between "
            >
                <Container
                    className="bg-zinc-800 rounded-lg flex "
                    component="main"
                    maxWidth="sm"
                    
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",

                           
                        }}
                        className="bg-white dark:bg-dark-mode text-black dark:text-white"
                    >
                        <div className=" w-100 h-0 pt-60
                        bg-contain bg-center  bg-light dark:bg-dark ">
    
                        </div>
                        
                        <div className="flex p-4 place-content-between ">
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
                        <div className="flex align-middle justify-center flex-grow">
                            <Link to={'/game'} className="self-center">
                                <button className="bg-gradient-to-r 
                                from-cyan-50 via-cyan-300 to blue-500
                                dark:from-orange-500 dark:via-purple-500 dark:to-pink-500  
                                buttonGradient">
                                    <span className="text-black dark:text-white text">JUGAR</span>
                                </button>

                            </Link>
                        </div>

                    </Box>
                </Container>
            </Container>
        )}
        </>
    )
}
