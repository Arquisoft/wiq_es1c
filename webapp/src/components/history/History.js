import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getHistory } from "../../services/user.service"
import { getGameModes } from "../../services/game.service"
import { Nav } from '../nav/Nav';
import {Footer} from '../footer/Footer';
import {CssBaseline, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import StringColorChip from './ColorChip';
import { useTranslation } from "react-i18next";
import "../home/Home.css";

function Row(props) {
    const { t } = useTranslation();

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    
    const countAwnsers = (Questions) => {
        return Questions.reduce(
            (val, question) => val + ((question.onTime&&question.answer===question.user_answer)?1:0),
            0
        )
    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
          <TableCell>{countAwnsers(row.Questions)}</TableCell>
          <TableCell>{row.Questions.length-countAwnsers(row.Questions)}</TableCell>
          <TableCell>{((countAwnsers(row.Questions)/row.Questions.length)*100).toFixed(0)}</TableCell>                                  
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  { t('History.questions') }
                </Typography>
                <Table size="small" aria-label="preguntas">
                  <TableHead>
                    <TableRow>
                      <TableCell>{ t('History.question') }</TableCell>
                      <TableCell>{ t('History.correctAnswer') }</TableCell>
                      <TableCell>{ t('History.yourAnswer') }</TableCell>
                      <TableCell>{ t('History.correct') }</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.Questions.map((questionRow) => (
                      <TableRow key={questionRow.id} data-testid="question">
                        <TableCell>{questionRow.title}</TableCell>
                        <TableCell>{questionRow.answer}</TableCell>
                        <TableCell>{questionRow.user_answer ?? t('History.unanswered') }</TableCell>
                        <TableCell>{(questionRow.onTime&&questionRow.answer===questionRow.user_answer)?<CheckCircleIcon color="success"/>:<CancelIcon color="error"/>}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Typography variant="h6" gutterBottom component="div">
                  { t('History.tags') }
                </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        (row.tags.split(',').filter(s => s.length > 0).length > 1)
                    ? <>
                        {row.tags.split(',').map((tag) => 
                            <StringColorChip label={tag}/>
                        )}
                    </> 
                    :   <StringColorChip label={ t('History.any') }/>}
                    
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}


export const History = () => {
    const { t } = useTranslation();
    const [history, setHistory] = useState([]);
    const [gamemodes, setGamemodes] = useState([]);

    useEffect(() => {
        getHistory("classic").then(item => setHistory(item));
    }, [])

    useEffect(() => {
        getGameModes(localStorage.getItem("token")).then(gamemodes => setGamemodes(gamemodes));
    }, []);

    const changeGamemode = (event) => {
        getHistory(event.target.value).then(item => setHistory(item));
        console.log("Changing history to " + event.target.value);
    }

    return (
        <>
            <Nav/>
            <CssBaseline/>
            <Container className="m-3">
                <FormControl sx={{ width: '20rem'}}>
                    <InputLabel id="gamemode-label" sx={{ color: 'white', fontSize: '1.3em'}}>{t("History.gamemode")}</InputLabel>
                    <Select
                        labelId="gamemode-cb"
                        id="gamemode-cb"
                        value='classic'
                        label="gamemode"
                        className="bg-white m-3"
                        onChange={changeGamemode}
                    >
                        {
                            gamemodes.map((gamemode) =>
                                <MenuItem value={gamemode} key={gamemode}>{gamemode}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Container>

            <Container className="flex flex-col items-center justify-center min-h-screen">
=
                <TableContainer component={Paper} className="mt-8 bg-gray-800">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>{ t('History.date') }</TableCell>
                                <TableCell>{ t('History.successful') }</TableCell>
                                <TableCell>{ t('History.failed') }</TableCell>
                                <TableCell>{ t('History.correctAnswers') }</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.slice().reverse().map((item) => 
                                <Row row={item} key={item.id}/>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer/>
        </>
    )
}