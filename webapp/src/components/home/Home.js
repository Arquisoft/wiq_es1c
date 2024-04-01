import React, { useEffect, useState } from 'react';
import {Box, IconButton, Chip, Container, CssBaseline, Modal, Typography} from "@mui/material";
import { getCurrentUser } from "../../services/user.service";
import banner from '../../media/wiq_banner.png';
import { Nav } from '../nav/Nav';
import './Home.scss';
import {useNavigate} from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

export const Home = () => 
{
    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState("No identificado");
    const [tagSelection, setTagSelection] = useState(false);
    const navigate = useNavigate();
    const tags = [
        {
            name:"Arte",
            active:true
        },{
            name:"Geografía",
            active:true
        },{
            name:"Ciencia",
            active:true
        }];

    const toggleTag = (e, tag) => {
        tag.active = !tag.active;
        e.currentTarget.dataset.active = tag.active;
    }

    const startGame = () => {
        let tagString = "";
        for (let i = 0; i < tags.length; i++) {
            if(tags[i].active)
                tagString += tags[i].name + ",";
        }

        tagString = tagString.substring(0, tagString.length - 1);
        navigate("/game", {
            state: {
                tags: tagString
            }
        });


    }

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

    const openTagSelection = () => setTagSelection(true);

    const closeTagSelection = () => setTagSelection(false);
    
    return (
        <>

        <Nav/>
        {(
            <Container
                component="main"
                maxWidth="md"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minHeight: "85vh", backgroundColor:"rgb(23 23 23 / var(--tw-bg-opacity))"}}
                className="min-h-screen flex  justify-center place-content-between"
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
                            alignItems: "left"

                        }}
                    >
                        <img src={banner} alt="WiQ"/>
                        <div className="flex p-4 place-content-between">
                            <Typography component="h2" variant="h4" fontFamily="monospace" fontWeight="bold"
                                        alignSelf="center">
                                Home
                            </Typography>

                            <Typography component="h3" variant="h5" fontFamily="monospace" alignSelf="center">
                                ¡Bienvenido, {username}!
                            </Typography>

                        </div>

                        <div className="p-2 m-1">
                            <Typography component="h3" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        alignSelf="center">
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
                            <Typography component="p" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        className="text-center p-3">
                                ¡Mucha suerte y demuestra lo que sabes!
                            </Typography>
                        </div>
                        <div className="flex align-middle justify-center flex-grow">
                                <button onClick={startGame} className="buttonGradient">
                                    <span className="text">JUGAR</span>
                                </button>
                        </div>
                        <div className="flex align-middle justify-center flex-grow m-3">
                            <button onClick={openTagSelection} className="buttonGradient">
                                    <span className="text">Elige las tags</span>
                            </button>

                        </div>

                    </Box>
                </Container>
                <Modal
                    open={tagSelection}
                    sx={{
                        display: 'flex',
                        width: '80em',
                        maxWidth: '80vw',
                        textAlign: 'center',
                        justifyContent: 'center',
                        justifySelf: 'stretch',
                        alignItems: "center"
                    }}>
                    <Container
                        className="bg-zinc-800 rounded-lg self-center"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <IconButton aria-label="close" color="secondary" onClick={closeTagSelection} className="self-end p-2">
                            <CancelIcon />
                        </IconButton>
                        <Box>
                            <Typography component="h3" variant="h2">
                                Tags
                            </Typography>
                            <p>Con las tags puedes seleccionar de qué categorías puede ser preguntado y cuáles no</p>
                            <div id="tagBox">
                                {tags.map((tag) =>
                                    <Chip
                                        className="tagChip"
                                        key={tag.name}
                                        onClick={(e) => toggleTag(e, tag)}
                                        variant="outlined"
                                        label={tag.name}
                                        data-active="true"

                                    >
                                    </Chip>

                                )}
                            </div>

                        </Box>

                    </Container>
                </Modal>

            </Container>


        )}

        </>
    )
}
