const getUsername = async (req,res) => {
    let response = await fetch("http://auth:8001/api/auth/getName", {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: req.body.token})
    })

    let json = await response.json()

    res.status(200).send({
        name: json.name,
        createdAt: json.createdAt 
    });
}

module.exports = getUsername;