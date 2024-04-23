const getHistory = async (req,res) => {
    let response = await fetch("http://game:8003/api/game/getHistory", {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: req.body.token})
    })


    res.status(200).send((await response.json()));
}

const getHistoryByUser = async (req, res) =>
{
    console.log("ID:\t" + req.body.userId);
    let response = await fetch("http://game:8003/api/game/getHistoryByUser", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: req.body.token,
            userId: req.body.userId
        })
    });

    res.status(200).send(
        await response.json()
    );
}

module.exports = { getHistory, getHistoryByUser };