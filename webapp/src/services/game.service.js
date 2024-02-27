import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const startNewGame = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8003/api/game/new`, { token });

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const nextQuestion = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8003/api/game/next`, { token });

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}