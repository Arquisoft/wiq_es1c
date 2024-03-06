import React, { useState, useEffect } from 'react';
import {Container, Paper, TableHead, TableRow, Table, TableContainer, TableBody, TableCell,} from "@mui/material";
import { getHistory } from "../../services/user.service"

export const History = () => {

    const [history, setHistory] = useState([]);
    
    const countAwnsers = (Questions) => {
        return Questions.reduce(
            (val, question) => val + ((question.onTime&&question.answer==question.user_answer)?1:0),
            0
        )
    }

    useEffect(() => {
        getHistory().then(item => setHistory(item));
    }, [])

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
            className="min-h-screen flex justify-center align-middle"
            >
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Juego</TableCell>
                                    <TableCell>Acertadas</TableCell>
                                    <TableCell>Falladas</TableCell>
                                    <TableCell>% de aciertos</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    history.toReversed().map((item, number) => 
                                        <TableRow key = {item.id}>
                                            <TableCell>Game {number+1}</TableCell>
                                            <TableCell>
                                                {
                                                    countAwnsers(item.Questions)
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item.Questions.length-countAwnsers(item.Questions)
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    ((countAwnsers(item.Questions)/item.Questions.length)*100).toFixed(0)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
        </Container>
    )
}