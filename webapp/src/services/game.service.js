import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const startNewGame = async (token, tags) =>
{
    try {
      await axios.post(`${apiEndpoint}:8003/api/game/new`, { "token": token, "tags": tags });

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const getEndTime = async (token) =>
{
  try {
    const response = await axios.post(`${apiEndpoint}:8003/api/game/update`, { "token": token });

    return {
      end: (Number(new Date().getTime()) + (Number(response.data.duration) * 1000)),
      start: new Date().getTime()
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

const getGameSetting = async (token) =>
{
  try {
    const response = await axios.post(`${apiEndpoint}:8003/api/game/settings`, { "token": token });

    return response.data;

  } catch (error) {
    return error;
  }
}

export {startNewGame, nextQuestion, awnser, getEndTime, getGameSetting};