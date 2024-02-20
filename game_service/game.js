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
const {newGame, next, awnser} = require("./game/endpoints");

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

// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`Game service listening at http://localhost:${port}`);
});


module.exports = server
