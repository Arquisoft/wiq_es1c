import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

let token;

const login = async (username, password) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8001/api/auth/login`, { username, password });

      token = response.data.token;

      localStorage.setItem('token', token);

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

      token = response.data.token;

      localStorage.setItem('token', token);

      return "";

    } catch (error) {
      return error.response.data.error;
    }
}

const getCurrentUser = async () =>
{
    try {

        const response = await axios.post(`${apiEndpoint}:8003/api/userdetails/name`, { token });
        if ( response.status === 200 )
            return response.data;
        else
            return response.data.error;

    } catch(error) {
        return error.response.data.error;
    }

}

const isLoggedIn = async (username, password) => token !== undefined;
const getToken = async () => token;

export {login, register, isLoggedIn, getToken, getCurrentUser};