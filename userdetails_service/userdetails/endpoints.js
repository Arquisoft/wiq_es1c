const jwt = require('jsonwebtoken');
const User = require("../db/models/user")

const privateKey = "ChangeMePlease!!!!"

// const {validate, getCurrentQuestion, requestQuestion} = require("./verification")

const getUsername = async (req,res) => {
    let userId = jwt.verify(req.body.token, privateKey).user_id;
    console.log("User ID found! --> userId");

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