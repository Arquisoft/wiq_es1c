// External libs
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mongodb = require('./db/mongo/config');

// My own libs
const authMiddleware = require('./auth/authMiddleware');
const sync = require("./db/sync");
const {newGame, next, awnser, update, getGameSettingsByUser} = require("./game/endpoints");
const { saveQuestionsInDB, deleteOlderQuestions, loadInitialQuestions } = require('./services/questionsService');

const port = 8003;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
app.post('/api/game/new', newGame);
app.post('/api/game/next', next);
app.post('/api/game/awnser', awnser);
app.post('/api/game/update', update);
app.get('/api/game/settings', getGameSettingsByUser);

// Connect with mongodb
mongodb();

// Save questions for each 24 hours
loadInitialQuestions();

//We dont want to do this in a test enviroment

setInterval( async () => {
  await deleteOlderQuestions();
  await saveQuestionsInDB();
}, 24 * 60 * 60 * 1000);

// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`Game service listening at http://localhost:${port}`);
});


module.exports = server
