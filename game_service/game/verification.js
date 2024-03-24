const axios = require('axios');

const validate = (req, requiredFields) => {
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
  return res = (await axios.post("http://question:8002/api/questions/generate")).data;
}

module.exports = {validate, getCurrentQuestion, requestQuestion}
  