import { React , useEffect } from "react";
import {getCurrentQuestion, getGameSettings } from "../../services/game.service";
import Game from "./Game";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";

export const AgainstClock = ({tags}) => {
    const token = localStorage.getItem('token');

    const location = useLocation();

    const isFinished = () => {
        return getCurrentQuestion(token).then(question => {
                 return question.user_answer !== question.answer;
        });
    }

    let basicGameSetting = undefined;

    let gameTags = "";

    if(tags !== undefined && tags !== null) {
        gameTags = tags;
    }
    if(location.state !== undefined && location.state !== null){
        gameTags = location.state.tags;
    }

    useEffect(() => {
        getGameSettings(token).then( settings => {
            basicGameSetting = settings;
        });
    }, []) // DO NOT REMOVE THE EMPTY ARRAY, THE APP WILL BREAK!!!!

    return (
        <Game
            finishFunction = {isFinished}
            name = "AgainstClock"
            tags = {gameTags}
            totalTime = {basicGameSetting.durationQuestion * 1000 * basicGameSetting.numberOfQuestions}
        />
    );


}

AgainstClock.propTypes = {
    tags: PropTypes.string.isRequired
}
