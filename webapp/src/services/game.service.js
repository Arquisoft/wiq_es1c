import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const startNewGame = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8003/api/game/new`, { "token": token });

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
      end: (Number(response.data.created) + (Number(response.data.duration) * 1000)),
      start: response.data.created
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

export {startNewGame, nextQuestion, awnser, getEndTime};