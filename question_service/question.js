// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const db = require("./db/mongo/config");
const {loadInitialTemplates, getRandomTemplate} = require("./db/mongo/utils");
const processTemplate = require("./questions/templateProcessor");


const port = 8002;
const app = express();

//Prometheus configuration
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
//app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.post('/api/questions/generate', async (req, res) => {
  try {
    res.status(200).json((await processTemplate(await getRandomTemplate()))); 
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
