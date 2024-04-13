const axios = require('axios');
const {Game} = require("../models")

const validate = (req, requiredFields) => {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return false;
      }
    }
    return true;
}
  
const getCurrentQuestion = async (userId) => {
    let games = await Game.findAll({
      where: {
        user_id: userId
      }
    });

    if(games == null || games.length < 1)
      return null;
  
    let game = games[0];  
  
    let questions = await game.getQuestions();
    if(questions == null || questions.length < 1)
      return null;
  
    return questions[0];
}
  
const requestQuestion = async() => {
  return res = (await axios.post("http://question:8002/api/questions/generate")).data;
}

module.exports = {validate, getCurrentQuestion, requestQuestion}
  