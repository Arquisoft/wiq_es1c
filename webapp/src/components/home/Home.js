import React, { useEffect, useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Avatar, Box, Container, CssBaseline,Typography, Button } from "@mui/material";
import { getCurrentUser } from "../../services/user.service";
import QuizIcon from '@mui/icons-material/Quiz';

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
        { !loggedIn
        ?
        ( 
            <Navigate to='/login' replace /> 
        )
        :
        (
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <QuizIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ¡Bienvenido a WIQ!
                        </Typography>
                        <Typography component="h2" variant="h6">
                            Estás conectado como: {username}
                        </Typography>
                        <Link to={ '/game' }>
                            <Button variant="contained">Jugar</Button>
                        </Link>

                    </Box>
                </Container>
            </Container>
        )}
        </>
    )
}
