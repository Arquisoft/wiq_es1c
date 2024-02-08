import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

let token;

const login = async (username, password) =>
{
    try {
        const response = await axios.post(`${apiEndpoint}:8001/api/auth/login`, { username, password });

        if(response.status === 401)
          return false;

        token = response.data.token;

        return true;

      } catch (error) {
        return false;
      }
}

const register = async (username, password) =>
{
      try {
        const response = await axios.post(`${apiEndpoint}:8001/api/auth/register`, { username, password });

        if(response.status === 201)
          return "";

        let err = response.data.error;

        return err;

      } catch (error) {
        return "";
      }
}

const isLoggedIn = async (username, password) => token !== undefined;
const getToken = async () => token;

export {login, register, isLoggedIn, getToken};