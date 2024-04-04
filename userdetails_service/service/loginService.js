const getUsername = async (req,res) => {
    let response = await fetch("http://auth:8001/api/auth/getName", {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: req.body.token})
    })


    res.status(200).send({
        name: (await response.json()).name
    });
}

module.exports = getUsername;