
import { React } from "react";
import {getCurrentQuestion } from "../../services/game.service";
import Game from "./Game";

export const SuddenDeath = () => {
    const token = localStorage.getItem('token');

    const isFinished = () => {
        return getCurrentQuestion(token).then(question => {
                 return question.user_answer !== question.answer;
        });
    }

    return (
        <Game
            finishFunction = {isFinished}
            name = "SuddenDeath"
            />
    );


}