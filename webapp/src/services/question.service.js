import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const getTags = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${apiEndpoint}:8002/api/questions/tags`,
            { "token": token });

        return response.data;

    } catch (error) {
        return error.response.data.error;
    }
}

export {getTags}