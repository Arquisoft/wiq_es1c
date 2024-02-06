// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// My own libs
const geoGen = require('./questions/questionGenerators/GeoGenerator');
const authMiddleware = require('./auth/authMiddleware');
const auth = require('./auth/authEndpoints');
const sync = require('./db/sync')

// Constants (TODO: Change into ENV variables)
const privateKey = "change me please!"
const port = 8000;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(cookieParser()); // Parse the request so we have cookies
app.use('/api/questions/', authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.get('/api/questions/generate', async (req, res) => {
  res.status(200).json(await geoGen())
});

// Auth endpoints
app.post("/api/auth/register", auth.register);
app.post("/api/auth/login", auth.login);
app.post("/api/auth/verify", auth.verify);

// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`API listening at http://localhost:${port}`);
});


module.exports = server