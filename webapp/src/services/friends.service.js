import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const getFriends = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8005/api/friends/`, { "token": token });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const getRequests = async (token) =>
{
    try {
      const response = await axios.post(`${apiEndpoint}:8005/api/friends/request/`, { "token": token });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const sendRequest = async (token, to) =>
{
    try {
      const response =await axios.post(`${apiEndpoint}:8005/api/friends/request/send/`, { "token": token, "to": to });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

const acceptRequest = async (token, from) =>
{
    try {
      const response =await axios.post(`${apiEndpoint}:8005/api/friends/request/accept/`, { "token": token, "from": from });

      return response.data;

    } catch (error) {
      return error.response.data.error;
    }
}

export {getFriends, getRequests, sendRequest, acceptRequest};