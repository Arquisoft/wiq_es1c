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
import { Nav } from '../nav/Nav';
import { CssBaseline } from '@mui/material';
import StringColorChip from './ColorChip';

function Row(props) {
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
                  Preguntas
                </Typography>
                <Table size="small" aria-label="preguntas">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pregunta</TableCell>
                      <TableCell>Respuesta correcta</TableCell>
                      <TableCell>Tu respuesta</TableCell>
                      <TableCell>Correcta</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.Questions.map((questionRow, i) => (
                      <TableRow key={i} data-testid="question">
                        <TableCell>{questionRow.title}</TableCell>
                        <TableCell>{questionRow.answer}</TableCell>
                        <TableCell>{questionRow.user_answer ?? "(Sin contestar)"}</TableCell>
                        <TableCell>{(questionRow.onTime&&questionRow.answer===questionRow.user_answer)?<CheckCircleIcon color="success"/>:<CancelIcon color="error"/>}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Typography variant="h6" gutterBottom component="div">
                  Tags
                </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        (row.tags.split(',').filter(s => s.length > 0).length > 1)
                    ? <>
                        {row.tags.split(',').map((tag, i) => 
                            <StringColorChip key={i} label={tag}/>
                        )}
                      </> 
                    :   <StringColorChip label="Cualquiera"/>}
                    
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}


export const History = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistory().then(item => setHistory(item));
    }, [])

    return (
        <>
            <Nav/>
            <CssBaseline/>
            <Container className="flex flex-col items-center justify-center min-h-screen">
                <TableContainer component={Paper} className="mt-8 bg-gray-800">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Acertadas</TableCell>
                                <TableCell>Falladas</TableCell>
                                <TableCell>% de aciertos</TableCell>
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
        </>
    )
}