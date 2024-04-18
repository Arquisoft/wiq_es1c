import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const startNewGame = async (token, tags, gameMode) =>
{
    if(gameMode === undefined)
        gameMode = "classic";

    try {
      await axios.post(`${apiEndpoint}:8003/api/game/new`, { "token": token, "tags": tags, "gameMode": gameMode });

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const getCurrentQuestion = async (token) => {
    try {
        const response = await axios.post(`${apiEndpoint}:8003/api/game/currentquestion`, { "token" : token});

        return response.data.question;
    } catch (error) {
        return undefined;
    }
}

const getNumberOfQuestions = async (token) => {
    try {
        const response = await axios.post(`${apiEndpoint}:8003/api/game/numberofquestions`, { "token" : token});

        return response.data.numberOfQuestions;

    } catch (error) {
        return undefined;
    }
}

const getEndTime = async (token, gameMode) =>
{
  try {
    const response = await axios.post(`${apiEndpoint}:8003/api/game/update`, { "token": token });

    //to check if the clock make the reset in this function (REMOVE BEFORE MERGE TO DEVELOP)
      console.log("Duracion pregunta de data "+ Number(response.data.duration));
      console.log("Duracion pregunta final "+ Number(response.data.duration) * 1000);
      return {
        end: (Number(new Date().getTime()) + (Number(response.data.duration) * 1000)),
        start: new Date().getTime(),
        gameDone: ((response.data.numberOfQuestions) <= (response.data.questionNumber))
      };

  } catch (error) {
    return undefined;
  }
}

const nextQuestion = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8003/api/game/next`, { "token": token });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const awnser = async (token, awnser) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8003/api/game/awnser`, { "token": token, "awnser":awnser });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const getGameSettings = async (token) =>
{
  try {
    const response = await axios.post(`${apiEndpoint}:8003/api/game/settings`, { "token": token });

    return response.data;

  } catch (error) {
    return error.response.data.error;
  }
}

const setGameSettings = async (token, duration, len) =>
{
  try {
    await axios.post(`${apiEndpoint}:8003/api/game/updatesettings`, { 
      "token": token, 
      "durationQuestion": duration, 
      "numberOfQuestions":len 
    });
  } catch (error) {
    return error.response.data.error;
  }
}

export {startNewGame, nextQuestion, awnser, getEndTime, getGameSettings, setGameSettings, getNumberOfQuestions, getCurrentQuestion};