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

const isValidToken = async (token) =>
{
  try {
    const response = await axios.post(`${apiEndpoint}:8001/api/auth/verify`, { token: token });
    
    return response.status === 200;

  } catch(error) {
      return error.response.data.error;
  }
}

const getCurrentUser = async () =>
{
    try {

        const response = await axios.post(`${apiEndpoint}:8004/api/userdetails/name`, { token: localStorage.getItem("token") });
        if ( response.status === 200 )
            return response.data.name;
        else
            return response.data.error;

    } catch(error) {
        return error.response.data.error;
    }

}

const getCreationDate = async () =>
{
    try {

        const response = await axios.post(`${apiEndpoint}:8004/api/userdetails/name`, { token: localStorage.getItem("token") });
        if ( response.status === 200 )
            return response.data.createdAt;
        
        else
            return response.data.error;
        

    } catch(error) {
        return error.response.data.error;
    }

}

const getHistory = async (gameMode) =>
{
    try {

        const response = await axios.post(`${apiEndpoint}:8004/api/userdetails/history`, { token: localStorage.getItem("token"), gameMode: gameMode });
        if ( response.status === 200 )
            return response.data;
        else 
            return "Cant load history";
    } catch(error) {
        return "Cant load history";
    }
}

const getHistoryByUser = async (user) =>
{
  try 
  {
    const response = await axios.post(`${apiEndpoint}:8004/api/userdetails/history-by-user`, { 
      token: localStorage.getItem("token"),
      userId: user.id
    });

    if ( response.status === 200 )
      return response.data;

    return "Cant get history by user " + user;
  } 
  catch (error) {
    return "Cant get history by user " + user;
  }
}

const getGamemodes = async () => {
    try {
        const response = await axios.post(`${apiEndpoint}:8003/api/game/gamemodes`, { token: localStorage.getItem("token") });
        if ( response.status === 200 )
            return response.data;
        else
            return "Cant load game modes";
    } catch(error) {
        return "Cant load game modes";
    }
}

const getUsers = async () =>
{
    try {

      const response = await axios.get(`${apiEndpoint}:8001/api/user/getUsers`);

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const getUser = async (userId) =>
{
  try
  {
    const response = await axios.get(`${apiEndpoint}:8001/api/user/getUser?user_id=${ userId }`);

    return response.data;
  }
  catch (error) 
  {
    return error.response.data.error;
  }
}

const isLoggedIn = async (username, password) => token !== undefined;
const getToken = async () => token;


export {login, register, isLoggedIn, getToken, getCurrentUser, getHistory, getCreationDate, isValidToken, getUsers, getUser, getHistoryByUser};

