import React, { useEffect, useState } from 'react';
import {Box, IconButton, Chip, Container, CssBaseline, Modal, Typography} from "@mui/material";
import { getCurrentUser } from "../../services/user.service";
import bannerDark from '../../media/wiq_banner.png';
import bannerLight from '../../media/wiq_banner.light.png';
import { Nav } from '../nav/Nav';
import './Home.css';
import {useNavigate} from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import {getTags} from "../../services/question.service";

export const Home = () => 
{
    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState("No identificado");
    const [tagSelection, setTagSelection] = useState(false);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            const user = await getCurrentUser();
            setUsername(user);
        };
        const fetchTags = async () => {
            const dynTags = await getTags();
            let adapted = [];
            for (let i = 0; i < dynTags.length; i++) {
                adapted.push(
                    {
                        name : dynTags[i],
                        active : true
                    });
            }
            setTags(adapted);
        }

        fetchUserName();
        fetchTags();
    }, []);

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
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minHeight: "85vh", color:'white', fontFamily:"monospace"}}
                className=" min-h-screen flex  justify-center place-content-between "
            >
                <Container
                    className="bg-teal-50 dark:bg-zinc-800 rounded-lg flex "
                    component="main"
                    maxWidth="sm"
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            padding: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left"

                        }}
                        className="bg-white dark:bg-dark-mode text-black dark:text-white "
                    >
                       <img src = {bannerLight} alt="WiQ" className="block dark:hidden" />
                       <img src = {bannerDark} alt="WiQ" className="hidden dark:block" />

                        <div className="flex p-4 place-content-between ">
                            <Typography  className="text-black dark:text-white " component="h2" variant="h4" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                                Home
                            </Typography>

                            <Typography  className="text-black dark:text-white " component="h3" variant="h5" fontFamily="monospace" alignSelf="center">
                                ¡Bienvenido, {username}!
                            </Typography>

                        </div>

                        <div className="p-2 m-1">
                            <Typography component="h3" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        alignSelf="center" className="text-black dark:text-white ">
                                Cómo jugar
                            </Typography>
                            <Typography component="p" variant="p" className="text-black dark:text-white ">
                                Cuando pulses en el botón de jugar, se te irán mostrando preguntas junto con 4 posibles
                                respuestas, sólo una de ellas es verdadera, haz click sobre la respuesta correcta para
                                ganar puntos.
                            </Typography>
                            <Typography component="p" variant="p" className="text-black dark:text-white ">
                                El tiempo para contestar es limitado. La barra en la parte inferior muestra el tiempo
                                restante. Si el tiempo se termina, la pregunta contará como fallada y se pasará a la
                                siguiente.
                            </Typography>
                            <Typography component="p" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        className="text-center p-3 text-black dark:text-white ">
                                ¡Mucha suerte y demuestra lo que sabes!
                            </Typography>
                        </div>
                        <div className="flex align-middle justify-center flex-grow">
                                <button onClick={startGame} className="bg-gradient-to-r
                                from-cyan-50 via-cyan-300 to blue-500
                                dark:from-orange-500 dark:via-purple-500 dark:to-pink-500
                                buttonGradient">
                                    <span className="text-black dark:text-white text">JUGAR</span>
                                </button>
                        </div>
                        <div className="flex align-middle justify-center flex-grow m-3">
                            <button onClick={openTagSelection} className="buttonGradient">
                                    <span className="text-black dark:text-white ">Elige las tags</span>
                            </button>

                        </div>

                    </Box>
                </Container>
                <Modal
                    open={tagSelection}
                    >
                    <Container
                        className="bg-white dark:bg-dark-mode text-black dark:text-white rounded-lg self-center"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: "1em",
                            textAlign: 'center',
                            justifyContent: 'center',
                            width: '50em',
                            maxWidth: '80vw',
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%) translateX(-50%)',
                            left: '50%'
                        }}>
                        <IconButton aria-label="close" color="secondary" onClick={closeTagSelection} className="self-end p-2">
                            <CancelIcon />
                        </IconButton>
                        <Box>
                            <Typography component="h3" variant="h2" className="text-black dark:text-white">
                                Tags
                            </Typography>
                            <p className="text-black dark:text-white">Con las tags puedes seleccionar las categorías sobre las que quieres ser preguntado.</p>
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
