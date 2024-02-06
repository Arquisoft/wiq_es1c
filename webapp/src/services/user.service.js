import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const login = async (username, password) =>
{
    try {
        const response = await axios.post(`${apiEndpoint}/login`, { username, password });
  
        const res = JSON.stringify({ "login": "success" });

        return res;

      } catch (error) {
        return error.response.data.error;
      }
}

export default login;