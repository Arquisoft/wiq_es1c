// External libs
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// My own libs
const geoGen = require('./questions/questionGenerators/GeoGenerator');
const authMiddleware = require('./auth/authMiddleware');

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
app.get("/api/auth/register", async (req, res) => {
  res.cookie('token', jwt.sign({user_id: 'testid'}, privateKey))
  res.status(200).send();
});

app.get("/api/auth/login", async (req, res) => {
  res.cookie('token', jwt.sign({user_id: 'testid'}, privateKey))
  res.status(200).send();
});

app.get("/api/auth/verify", async (req, res) => {
  let token = req.cookies.token
  try{
    let decoded = jwt.verify(token, privateKey);

    console.log(decoded)

    res.status(200).send();

  }catch(err){

    res.status(403).send();
    return;
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


module.exports = server