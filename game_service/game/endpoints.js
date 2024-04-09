const jwt = require('jsonwebtoken');
const {Game, Question, SettingsGameMode} = require("../models")
const suffle = require("./arrayShuffle")

const privateKey = "ChangeMePlease!!!!"

const {validate, getCurrentQuestion} = require("./verification");
const { loadQuestion } = require('../services/questionsService');

const next = async (req,res) => {
    const userId = await jwt.verify(req.body.token, privateKey).user_id;
    
    const games = await Game.findAll({
      where: {
        user_id: userId
      }
    });

    if(games == null || games.length < 1){
      res.status(400).send();
      return;
    }
  
    const game = games[0];

    //Check the game isnt finished 
    if((await game.getQuestions()).length >= game.numberOfQuestions){
      res.status(400).send();
      return; 
    }

    let settings = await SettingsGameMode.findOne({ 
      where: { 
        user_id: userId 
      } 
    });
  
    if (settings == null) {
      settings = await SettingsGameMode.create({
        user_id: userId,
      })
    }

    const questionRaw = await loadQuestion(game.tags.split(",").filter(s=>s.length > 0));
    
    Question.create({
      title: questionRaw.title,
      imageUrl: questionRaw.imageUrl ? questionRaw.imageUrl : "",
      answer: questionRaw.answer,
      fake: questionRaw.fakes,
      duration: settings.durationQuestion,
      gameId: game.id
    })
  
    res.status(200).json({
      title: questionRaw.title,
      imageUrl: questionRaw.imageUrl ? questionRaw.imageUrl : "",
      awnsers: suffle([
        String(questionRaw.answer),
        String(questionRaw.fakes[0]),
        String(questionRaw.fakes[1]),
        String(questionRaw.fakes[2])
      ])
    });
}

const update = async (req, res) => {
    let userId = await jwt.verify(req.body.token, privateKey).user_id;
    
    let question = await getCurrentQuestion(userId);

    if(question == null){
      res.status(400).send();
      return;
    }
    
    res.status(200).json({
      title: question.title,
      imageUrl: question.imageUrl ? question.imageUrl : "",
      awnsers: suffle([
        String(question.answer),
        String(question.fake[0]),
        String(question.fake[1]),
        String(question.fake[2])
      ]),
      created: String(question.createdAt.getTime()),
      duration: String(question.duration),
      numberOfQuestions: (await question.getGame()).numberOfQuestions,
      questionNumber: (await(await question.getGame()).getQuestions()).length
    });
}

const newGame = async (req,res) => {
    let userId = await jwt.verify(req.body.token, privateKey).user_id;

    let tags = req.body.tags ?? "";

    let settings = await SettingsGameMode.findOne({ 
      where: { 
        user_id: userId 
      } 
    });
  
    if (settings == null) {
      settings = await SettingsGameMode.create({
        user_id: userId,
      })
    }

    await Game.create({
      user_id: userId,
      tags: tags,
      numberOfQuestions: settings.numberOfQuestions
    })
  
    res.status(200).send();
}

const awnser = async (req,res) => {
    let userId = await jwt.verify(req.body.token, privateKey).user_id;

    if(!validate(req,['awnser'])){
      res.status(400).send();
      return;
    }   
  
    let awnser = req.body.awnser;
    let question = await getCurrentQuestion(userId);
  
    if(question == null){
      res.status(400).send();
      return;
    }
  
    question.user_answer = awnser;
    question.onTime = (
      (new Date().getTime() - question.createdAt.getTime()) 
      < 
      (question.duration * 1000)
    )

    question.save();
    
    res.status(200).send(question.answer);
}

const getHistory = async (req,res) => {
  let userId = jwt.verify(req.body.token, privateKey).user_id;

  let games = await Game.findAll({
    where: {
      user_id: userId
    },
    include: [{
      model: Question,
      as: 'Questions' // alias defined in the association
    }]
  });

  return res.status(200).json(games.map(game => game.toJSON()))
}

const getGameSettingsByUser = async (req, res) =>{
  const userId = await jwt.verify(req.body.token, privateKey).user_id;

  let settings = await SettingsGameMode.findOne({ 
    where: { 
      user_id: userId 
    } 
  });

  if (settings == null) {
    settings = await SettingsGameMode.create({
      user_id: userId,
    })
  }

  res.status(200).send(settings);
}

const setGameSettingsByUser = async (req, res) =>{
  const userId = await jwt.verify(req.body.token, privateKey).user_id;

  if(!validate(req,['durationQuestion','numberOfQuestions'])){
    res.status(400).send();
    return;
  }   

  let settings = await SettingsGameMode.findOne({ 
    where: { 
      user_id: userId 
    } 
  });

  if (settings == null) {
    settings = await SettingsGameMode.create({
      user_id: userId,
    })
  };

  if(req.body.durationQuestion < 5, req.body.numberOfQuestions < 1) {
    res.status(400).send();
    return;
  }   

  settings.durationQuestion = req.body.durationQuestion;
  settings.numberOfQuestions = req.body.numberOfQuestions;
  settings.save();
  
  res.status(200).send(settings);
}

module.exports = {newGame, next, awnser, update, getHistory, getGameSettingsByUser, setGameSettingsByUser}