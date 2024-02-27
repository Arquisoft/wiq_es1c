import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

let token;

const login = async (username, password) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8001/api/auth/login`, { username, password });

      token = response.data.token;

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const register = async (username, password) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8001/api/auth/register`, { username, password });

      if ( response.status === 200 )
        return response.data.error;

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const isLoggedIn = async (username, password) => token !== undefined;
const getToken = async () => token;

export {login, register, isLoggedIn, getToken};