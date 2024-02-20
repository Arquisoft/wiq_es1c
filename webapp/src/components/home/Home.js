
import {
    Container,
    Typography,
    Button,
    CssBaseline,
    Box,
    Avatar,
} from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import {Link} from "react-router-dom";
import React from "react";

// const userService = require("../../services/user.service");

const Home = () => {
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <QuizIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ¡Bienvenido a WIQ!
                    </Typography>
                    <Typography component="h2" variant="h6">
                        Estás conectado como:
                        </Typography>
                    <Link to={ '/login' }>
                        <Button variant="contained">Jugar</Button>
                    </Link>

                </Box>
            </Container>
        </Container>
    );
}

export default Home;