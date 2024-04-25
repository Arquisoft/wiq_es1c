const axios = require('axios');

const getUsername = async (req,res) => {
    let url = "http://auth:8001/api/auth/getName";
    
    if(process.env.NODE_ENV !== "production"){
        url = "http://localhost:8001/api/auth/getName"
    }

    const response = await axios.post(url, {
        token: req.body.token
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let json = await response.data

    res.status(200).send({
        name: json.name,
        createdAt: json.createdAt 
    });
}

module.exports = getUsername;