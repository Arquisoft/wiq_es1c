// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const authMiddleware = require('./auth/authMiddleware');
const sync = require("./db/sync");

const port = 8003;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.post('/api/questions/generate', async (req, res) => {
  res.status(200).text("ok")
});

// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`Game service listening at http://localhost:${port}`);
});


module.exports = server
