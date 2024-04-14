import React, { useEffect, useState } from 'react';
import {Box, IconButton, Chip, Container, CssBaseline, Modal, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

import './Home.css';
import { getCurrentUser } from "../../services/user.service";
import { Nav } from '../nav/Nav';
import {getTags} from "../../services/question.service";
import {useNavigate} from "react-router-dom";
import bannerDark from '../../media/wiq_banner.png';
import bannerLight from '../../media/wiq_banner.light.png';

export const Home = () => 
{
    const { t } = useTranslation();

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
            dynTags.forEach((dynTag) => adapted.push({ name: dynTag, active: true}));
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
        let tagString = stringifyTags();
        navigate("/game", {
            state: {
                tags: tagString
            }
        });


    }

    const startSuddenDeath = () => {
        let tagString = stringifyTags();
        navigate("/suddendeath", {
            state: {
                tags: tagString
            }
        })
    }

    const stringifyTags = () => {
        let tagString = "";
        tags.forEach((tag) => {
            if(tag.active)
                tagString += tag.name + ","
        });

        return tagString.substring(0, tagString.length - 1);
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
                className="bg-teal-50 dark:bg-zinc-800 min-h-screen flex  justify-center place-content-between rounded-lg flex"
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
                        <img src={bannerLight} alt="WiQ" className="block dark:hidden"/>
                        <img src={bannerDark} alt="WiQ" className="hidden dark:block"/>

                        <div className="flex p-4 place-content-between ">
                            
                            <Typography className="text-black dark:text-white " component="h2" variant="h4"
                                        fontFamily="monospace" fontWeight="bold" alignSelf="center">
                                { t('Home.home') }
                            </Typography>

                            <Typography className="text-black dark:text-white " component="h3" variant="h5"
                                        fontFamily="monospace" alignSelf="center">
                                { t('Home.welcome', { name: username }) }
                            </Typography>

                        </div>

                        <div className="p-2 m-1">
                            <Typography component="h3" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        alignSelf="center" className="text-black dark:text-white ">
                                { t('Home.howToPlay') }
                            </Typography>
                            <Typography component="p" variant="p" className="text-black dark:text-white ">
                                { t('Home.tutorialP1') }
                            </Typography>
                            <Typography component="p" variant="p" className="text-black dark:text-white ">
                                { t('Home.tutorialP2') }
                            </Typography>
                            <Typography component="p" variant="h6" fontFamily="monospace" fontWeight="bold"
                                        className="text-center p-3 text-black dark:text-white ">
                                { t('Home.goodLuck') }
                            </Typography>
                        </div>
                        <div className="flex align-middle justify-center flex-grow m-3">
                            <button onClick={startGame} className="bg-gradient-to-r
                                from-cyan-50 via-cyan-300 to blue-500
                                dark:from-orange-500 dark:via-purple-500 dark:to-pink-500
                                buttonGradient">
                                    <span className="text-black dark:text-white text">{ t('Home.play') }</span>
                                </button>
                        </div>
                        <div className="flex align-middle justify-center flex-grow m-3">
                            <button onClick={startSuddenDeath} className="bg-gradient-to-r
                                from-cyan-50 via-cyan-300 to blue-500
                                dark:from-orange-500 dark:via-purple-500 dark:to-pink-500
                                buttonGradient">
                                <span className="text-black dark:text-white text">JUGAR MUERTE SÚBITA</span>
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
                        data-testid="tag-selection"
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
                            <p className="text-black dark:text-white">{ t('Home.infoTags') }</p>
                            <div id="tagBox">
                                {tags.map((tag) =>
                                    <Chip
                                        className="tagChip text-black dark:text-white"
                                        key={tag.name}
                                        onClick={(e) => toggleTag(e, tag)}
                                        variant="outlined"
                                        label={tag.name}
                                        data-active={tag.active}

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
