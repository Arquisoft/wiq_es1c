import { React } from "react";
import {getCurrentQuestion } from "../../services/game.service";
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

    let gameTags = "";

    if(tags !== undefined && tags !== null) {
        gameTags = tags;
    }
    if(location.state !== undefined && location.state !== null){
        gameTags = location.state.tags;
    }

    return (
        <Game
            finishFunction = {isFinished}
            name = "AgainstClock"
            tags = {gameTags}
            timeObj = {time => {
                if(time !== undefined){
                    let total = basicGameSetting.durationQuestion * 1000 * basicGameSetting.numberOfQuestions;
                    let trans = (new Date().getTime()) - time.start;

                    let percentage =  (trans/total) * 100;
                    let invertedPercentage = 100 - Number(percentage);
                    
                    setRemTime((invertedPercentage/100)*110);

                    if(percentage > 100){
                        comprobarPregunta("");
                        time = undefined;
                    }
                }
                console.log("Tipo de time: "+typeof time );
            return time;
        }}
        />
    );


}

AgainstClock.propTypes = {
    tags: PropTypes.string.isRequired
}
