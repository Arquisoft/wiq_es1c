// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const db = require("./db/mongo/config");
const {loadInitialTemplates, getRandomTemplate} = require("./db/mongo/utils");

const geoGen = require('./questions/questionGenerators/GeoGenerator');
const histGen = require('./questions/questionGenerators/HistoryGenerator');
const sciGen = require('./questions/questionGenerators/ScienceGenerator');
const filmGen = require('./questions/questionGenerators/FilmGenerator');

const generatorsArray = [geoGen,sciGen,filmGen,histGen];

const randomGenerator = () => generatorsArray[Math.floor(Math.random() * generatorsArray.length)];

const port = 8002;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
//app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.get('/api/questions/generate', async (req, res) => {
  try {
    res.status(200).json((await getRandomTemplate())); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});


// Start the server
const server = app.listen(port, () => {
  db().then(loadInitialTemplates);
  console.log(`Questions service listening at http://localhost:${port}`);
});


module.exports = server
