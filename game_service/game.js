// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const privateKey = "ChangeMePlease!!!!"

// My own libs
const authMiddleware = require('./auth/authMiddleware');
const sync = require("./db/sync");
const User = require("./db/models/user")
const Game = require("./db/models/game")
const Question = require("./db/models/question")

const port = 8003;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(authMiddleware); // Auth middleware for the questions API

//Helper functions 
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      return false;
    }
  }
  return true;
}

const getCurrentQuestion = async (user) => {

  let games = await user.getGames();
  if(games == null || games.length < 1)
    return null;

  let game = games[0];  

  let questions = await game.getQuestions();
  if(questions == null || questions.length < 1)
    return null;

  let question = questions[0]
  if(question.user_answer != null)
    return null;

  return question
}

const requestQuestion = async() => {
  let res = (await axios.post("http://question:8002/api/questions/generate")).data;

  return {
    "title": res.title,
    "awnser": res.awnser,
    "fake" : res.fake
  }
}

// Api endpoints
app.post('/api/game/new', async (req, res) => {
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
});

app.post('/api/game/next', async (req, res) => {
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
      ""+questionRaw.awnser,
      ""+questionRaw.fake[0],
      ""+questionRaw.fake[1],
      ""+questionRaw.fake[2]
    ]
  });
});

app.post('/api/game/awnser', async (req, res) => {
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

  if(!validateRequiredFields(req,"awnser")){
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
});

// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`Game service listening at http://localhost:${port}`);
});


module.exports = server
