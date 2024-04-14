const jwt = require('jsonwebtoken');
const {Friendship, FriendRequest} = require("../models")
const { Op } = require('sequelize');

const privateKey = "ChangeMePlease!!!!"

const sendRequest = async (req, res) => {
    if(!validate(req, ["to"])) {
        res.status(400).send();
        return;
    }

    const userId = await jwt.verify(req.body.token, privateKey).user_id;

    let request = await FriendRequest.findAll({
        where: {
            [Op.or]: [
                { from: req.body.to, to: userId },
                { from: userId, to: req.body.to },
            ]
        }
    })

    if(request.length > 0) {
        res.status(400).send({error: "Ya hay una peticion en curso"});
        return;
    }

    await FriendRequest.create({
        from: req.body.to,
        to: userId
    })

    if(request != null) {
        res.status(200).send();
    }
}

const acceptRequest = async (req, res) => {

}

const getRequests = async (req, res) => {

}

const getFriends = async (req, res) => {

}

module.exports = {sendRequest, acceptRequest, getRequests, getFriends}

const validate = (req, requiredFields) => {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return false;
      }
    }
    return true;
}