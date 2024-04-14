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

    
    let friendship = await Friendship.findAll({
        where: {
            [Op.or]: [
                { friend1: req.body.to, friend2: userId },
                { friend1: userId, friend2: req.body.to },
            ]
        }
    })

    if(request.length > 0 || friendship.length > 0) {
        res.status(400).send({error: "Ya hay una peticion en curso, o ya sois amigos"});
        return;
    }

    await FriendRequest.create({
        from: userId,
        to: req.body.to
    })

    res.status(200).send();
}

const acceptRequest = async (req, res) => {
    if(!validate(req, ["from"])) {
        res.status(400).send();
        return;
    }

    const userId = await jwt.verify(req.body.token, privateKey).user_id;

    let request = await FriendRequest.destroy({
        where: { 
            from: req.body.from, 
            to: userId 
        }   
    })
    
    if(request) {
        await Friendship.create({
            friend1: req.body.to,
            friend2: userId
        })
        
        res.status(200).send();
    }
    
    res.status(400).send();
}

const getRequests = async (req, res) => {
    const userId = await jwt.verify(req.body.token, privateKey).user_id;

    let requests = await FriendRequest.findAll({
        where: {
             to: userId ,
        }
    })

    res.status(200).json(requests.map(request => request.toJSON()))
}

const getFriends = async (req, res) => {
    const userId = await jwt.verify(req.body.token, privateKey).user_id;

    let requests = await Friendship.findAll({
        where: {
            [Op.or]: [
                { friend2: userId },
                { friend1: userId },
            ]
        }
    })

    res.status(200).json(requests.map(request => request.toJSON()))
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