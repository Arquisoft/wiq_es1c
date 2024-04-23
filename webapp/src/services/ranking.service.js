const { getUsers, getHistoryByUser, getUser } = require("./user.service");

const getRanking = async () =>
{
  let ranking = [];
  
  const users = await getUsers();

  for (let i = 0; i < users.length; i++)
    ranking.push( await getHistoryByUser(users[i]) );

  return ranking;
}

const sortByHitPercentage = async (data) =>
{
  let ranking = [];

  for (let i = 0; i < data.length; i++)
  {
    if (data[i].length > 0)
    {
      const userId = data[i][0].user_id;
      let numberOfQuestions = 0;
      let hits = 0;

      // Recorro cada partida
      for (let j = 0; j < data[i].length; j++)
      {
        numberOfQuestions += data[i][j].numberOfQuestions;

        // Recorro cada pregunta
        for (let k = 0; k < data[i][j].Questions.length; k++)
          if (data[i][j].Questions[k].answer === data[i][j].Questions[k].user_answer)
            hits++;
      }

      const hitsPercentage = ( hits / numberOfQuestions ) * 100;
      const user = await getUser(userId);
      
      ranking.push({
        ...user,
        hitsPercentage: hitsPercentage
      });
    }

  }

  ranking.sort((a, b) => b.hitsPercentage - a.hitsPercentage);

  return ranking;
}

const sortByNumberOfCorrectQuestions = async (data) =>
{
  let ranking = [];

  for (let i = 0; i < data.length; i++)
  {
    if (data[i].length > 0)
    {
      const userId = data[i][0].user_id;
      let correctsAnswer = 0;

      // Recorro cada partida
      for (let j = 0; j < data[i].length; j++)
      {
        // Recorro cada pregunta
        for (let k = 0; k < data[i][j].Questions.length; k++)
          if (data[i][j].Questions[k].answer === data[i][j].Questions[k].user_answer)
            correctsAnswer++;
      }

      const user = await getUser(userId);
      
      ranking.push({
        ...user,
        correctsAnswer: correctsAnswer
      });
    }

  }

  ranking.sort((a, b) => b.correctsAnswer - a.correctsAnswer);

  return ranking;
}

const sortByNumberOfPlays = async (data) =>
{
  let ranking = [];

  for (let i = 0; i < data.length; i++)
  {
    if (data[i].length > 0)
    {
      const userId = data[i][0].user_id;
      let numberOfPlays = data[i].length;

      const user = await getUser(userId);
      
      ranking.push({
        ...user,
        numberOfPlays: numberOfPlays
      });
    }

  }

  ranking.sort((a, b) => b.numberOfPlays - a.numberOfPlays);

  return ranking;
}

module.exports = { getRanking, sortByHitPercentage, sortByNumberOfCorrectQuestions, sortByNumberOfPlays }