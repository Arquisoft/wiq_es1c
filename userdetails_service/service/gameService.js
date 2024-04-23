const axios = require('axios');

const getHistory = async (req,res) => {
    let url = "http://game:8003/api/game/getHistory";
    
    if(process.env.NODE_ENV !== "production"){
        url = "http://localhost:8003/api/game/getHistory"
    }

    const response = await axios.post(url, {
        token: req.body.token
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    res.status(200).send((await response.data));
}

module.exports = getHistory;