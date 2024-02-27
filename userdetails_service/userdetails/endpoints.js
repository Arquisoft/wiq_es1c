const jwt = require('jsonwebtoken');
const User = require("../db/models/user")

const privateKey = "ChangeMePlease!!!!"

const getUsername = async (req,res) => {
    let userId = jwt.verify(req.body.token, privateKey).user_id;

    let user = await User.findOne({
        where: {
            id: userId
        }
    })

    if(user == null){
        res.status(400).send();
        return;
    }

    res.status(200).json({
        name: user.name
    });
}

module.exports = {getUsername}