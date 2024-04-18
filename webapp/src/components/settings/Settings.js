import React, { useEffect, useState } from 'react';
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import { Nav } from '../nav/Nav';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { useTranslation } from "react-i18next";

import { getGameSettings, setGameSettings} from "../../services/game.service";

export const Settings = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem("token");

    const [duration, setDuration] = useState(0);
    const [len, setLen] = useState(0);

    useEffect(() => {
        getGameSettings(token).then((settings) => {
            setDuration(settings.durationQuestion)
            setLen(settings.numberOfQuestions)
        })
    },[]);

    const handleNumberChange = (event, number) => {
        setLen(number)
        setGameSettings(token,duration,number);
    }

    
    const handleDurationChange = (event, number) => {
        setDuration(number)
        setGameSettings(token,number,len);
    }

    return (
        <>
        <Nav/>
        {(
            <Container
                component="main"
                maxWidth="md"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minHeight: "85vh"}}
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
                        <Typography  className="text-black dark:text-white " component="h2" variant="h4" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                            { t('Configuration.title') }
                        </Typography>

                        <Box>
                            <Typography id="Questions_Number" gutterBottom className="text-black dark:text-white ">
                                { t('Configuration.numQuestions') }
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Slider 
                                        color="secondary" 
                                        value={len} 
                                        defaultValue={0} 
                                        step={1}
                                        marks 
                                        min={5} 
                                        max={50} 
                                        aria-labelledby="Questions_Number"
                                        onChange={handleNumberChange}
                                    />
                                </Grid> 
                                <Grid item xs={4}>
                                    <Typography className="text-black dark:text-white">
                                        {len}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Typography id="Questions_Duration" gutterBottom className="text-black dark:text-white ">
                                { t('Configuration.durationQuestions') }
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Slider 
                                        color="secondary" 
                                        value={duration} 
                                        defaultValue={0} 
                                        step={1} 
                                        marks 
                                        min={5} 
                                        max={60} 
                                        aria-labelledby="Questions_Duration" 
                                        onChange={handleDurationChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className="text-black dark:text-white">
                                        {duration}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Container>
        )}
        </>
    )
}
