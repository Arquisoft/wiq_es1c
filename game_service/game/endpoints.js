const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require("../db/models/user")
const Game = require("../db/models/game")
const Question = require("../db/models/question")

const privateKey = "ChangeMePlease!!!!"

const {validate, getCurrentQuestion, requestQuestion} = require("./verification")

const next = async (req,res) => {
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
  
    //If he is ingame we dont have to create a new game
    if(!user.ingame){
      res.status(400).send();
      return;
    }
  
    let question = await getCurrentQuestion(user);
    if(question != null){
      res.status(400).send();
      return; 
    }
  
    let questionRaw = await requestQuestion();
  
    let games = await user.getGames();
    let game = games[0];
  
    Question.create({
      title: questionRaw.title,
      answer: questionRaw.awnser,
      fake: questionRaw.fake,
      GameId: game.id
    })
  
    res.status(200).json({
      title: questionRaw.title,
      awnsers: [
        String(questionRaw.awnser),
        String(questionRaw.fake[0]),
        String(questionRaw.fake[1]),
        String(questionRaw.fake[2])
      ]
    });
}

const newGame = async (req,res) => {
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
  
    user.ingame = true;
  
    await Game.create({
      UserId: user.id
    })
  
    await user.save();
  
    res.status(200).send();
}

const awnser = async (req,res) => {
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

    if(!validate(req,['awnser'])){
      res.status(400).send();
      return;
    }
    
  
    let awnser = req.body.awnser;
    let question = await getCurrentQuestion(user);
  
    if(question == null){
      res.status(400).send();
      return;
    }
  
    question.user_answer = awnser;
  
    question.save();
    
    res.status(200).send(question.answer);
}

module.exports = {newGame, next, awnser}