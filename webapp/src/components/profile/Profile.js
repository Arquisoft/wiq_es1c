import React , { useEffect, useState }  from 'react';
import { getCurrentUser, getCreationDate, getHistory } from "../../services/user.service";
import {Box, Container, CssBaseline,Typography,Icon, CircularProgress } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Nav } from '../nav/Nav';


export const Profile = () =>{

    const [username, setUsername] = useState("No identificado");
    const [creationDate,setCreationDate] = useState();
    const [lastGame,setLastGame] = useState([]);
    const [general,setGeneral] = useState([]);

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
            const fixedDate = creationDate.slice(0, 10);
            setCreationDate(fixedDate);
        };
        fetchCreationDate();
    }, []);

    useEffect(() =>{
        const countAnswers = (questions) => {
        
            return questions.reduce(
                (val, question) => val + ((question.onTime&&question.answer===question.user_answer)?1:0),
                0
            )
        }
        const fetchLastGame = async() =>{
            const history = await getHistory();
            if(history.length !==0){
            const questions = history[0].Questions;
            const value = ((countAnswers(questions)/questions.length)*100).toFixed(0)
            if(!isNaN(parseInt(value))){
                setLastGame(value);
            }
            else{
            setLastGame(0);
            } 
        }
        
        
            
        }
        fetchLastGame();
    },[])

    useEffect(() =>{
        const countAnswers = (questions) => {
        
            return questions.reduce(
                (val, question) => val + ((question.onTime&&question.answer===question.user_answer)?1:0),
                0
            )
        }
        const fetchGeneral = async() =>{
            let history = await getHistory();
            let value=0;
            let provisional=0;
            let contador=0;
            if(history.length !== 0){
            for(let i=0;i<history.length;i++){
                provisional = ((countAnswers(history[i].Questions)/history[i].Questions.length)*100).toFixed(0);
                if(!isNaN(parseInt(provisional))){
                    value+=parseInt(provisional);
                    contador+=1;
                }
            }
            value = value/contador;
            setGeneral(value.toFixed(1));
        }else{
            setGeneral(0);
        }
            
            
        }
        fetchGeneral();
    },[])




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
              className="text-black dark:text-white"
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
                        <div>
                        <Typography className="text-black dark:text-white" component="h2" variant="h4" fontFamily="monospace" fontWeight="bold" alignSelf="center">
                        Usuario: {username}
                        </Typography>
                        <Typography className="text-black dark:text-white" fontFamily="monospace" fontWeight="bold" >
                            LLeva jugando desde: {creationDate}
                        </Typography>
                        </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' , justifyContent: 'space-between'}}>
                        <div >
                            <Typography className="text-black dark:text-white" style={{ marginBottom: '20px' }}> 
                                Resultados última partida
                            </Typography>
                        <CircleProgress percentage={Number(lastGame)} />
                        </div>
                        <div >
                            <Typography className="text-black dark:text-white" style={{ marginBottom: '20px' }}>
                                Resultados generales
                            </Typography>
                        <CircleProgress percentage={Number(general)} />
                        </div>
                        </div>
                    </Box>
            <CssBaseline />
            </Container>
        </Container>
        
        </>
    )
}