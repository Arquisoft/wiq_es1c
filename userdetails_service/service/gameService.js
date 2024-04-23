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
    if (!req.body.userId)
    {
        res.status(400).json({ error: 'user id is not valid' });
        return;
    }

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