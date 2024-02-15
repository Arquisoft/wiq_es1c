// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const geoGen = require('./questions/questionGenerators/GeoGenerator');
const authMiddleware = require('./auth/authMiddleware');

const port = 8002;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.get('/api/questions/generate', async (req, res) => {
  res.status(200).json(await geoGen())
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Questions service listening at http://localhost:${port}`);
});


module.exports = server