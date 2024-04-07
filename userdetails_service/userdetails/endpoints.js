const jwt = require('jsonwebtoken');
const User = require("../db/models/user");
const Game = require("../db/models/game");
const Question = require('../db/models/question');

const privateKey = "ChangeMePlease!!!!";

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

const getCreationDate = async(req,res) =>{
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
        date: user.createdAt
    });
}

const getHistory = async (req,res) => {
    let userId = jwt.verify(req.body.token, privateKey).user_id;

    let user = await User.findOne({
        where: {
            id: userId
        },
        include: [{
            model:Game,
            include: [Question]
        }]
    })

    if(user == null){
        res.status(400).send();
        return;
    }

    return res.status(200).json(user.Games.map(game => game.toJSON()))
}

module.exports = {getUsername, getHistory, getCreationDate}