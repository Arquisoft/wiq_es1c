import React , { useEffect, useState }  from 'react';
import { getCurrentUser, getCreationDate } from "../../services/user.service";
import {Box, Container, CssBaseline,Typography,Icon, CircularProgress } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Nav } from '../nav/Nav';


export const Profile = () =>{

    const [username, setUsername] = useState("No identificado");
    const [creationDate,setCreationDate] = useState();

    useEffect(() => {
        const fetchUserName = async () => {
            const user = await getCurrentUser();
            setUsername(user);
        };
        fetchUserName();
    }, []);

    useEffect(() => {
        const fetchCreationDate = async () => {
            const creationDate = await getCreationDate();
            setCreationDate(creationDate);
        };
        fetchCreationDate();
    }, []);

    const CircleProgress = ({ percentage }) => {
        return (
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <CircularProgress
              variant="determinate"
              size={100}
              thickness={2}
              value={percentage}
              style={{ position: 'absolute', top: 0, left: 0, color: 'inherit' }}
             
            />
            <Typography
              variant="body2"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {percentage}%
            </Typography>
          </div>
        );
      };

    return (
        <>
        <Nav/>
        <Container
        component="main"
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "85vh" }}
        className="min-h-screen flex justify-center align-middle"
        >
            <Container
            className="bg-teal-50 dark:bg-zinc-800 rounded-lg flex"
            component="main"
            maxWidth="sm"
        >
             <Box
                sx={{
                    padding: 3,
                    display: "flex",
                     flexDirection: "column",
                    alignItems: "left",

                    }}
                    className="bg-white dark:bg-dark-mode text-black dark:text-white "
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        
                        <Icon
                            className="icon-container"
                            style={{ fontSize: '130px', display: 'flex', alignItems: 'center'}}
                            aria-label="account of current user"
                            aria-controls="account-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            data-testid="open-account-menu"
                        >
                            <AccountCircle style={{ fontSize: '48px' }}/>
                        </Icon>
                        <Typography component="h2" variant="h4" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                        {username}
                        </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' , justifyContent: 'space-between'}}>
                        <div >
                            <Typography style={{ marginBottom: '20px' }}> 
                                Resultados última partida
                            </Typography>
                        <CircleProgress percentage={75} />
                        </div>
                        <div >
                            <Typography style={{ marginBottom: '20px' }}>
                                Resultados generales
                            </Typography>
                        <CircleProgress percentage={14} />
                        </div>
                        </div>
                    </Box>
            <CssBaseline />
            </Container>
        </Container>
        
        </>
    )
}