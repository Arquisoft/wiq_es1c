// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const auth = require('./auth/authEndpoints');
const sync = require('./db/sync')

const port = 8001;
const app = express();

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend

// Auth endpoints
app.post("/api/auth/register", auth.register);
app.post("/api/auth/login", auth.login);
app.post("/api/auth/verify", auth.verify);
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});


// Start the server
const server = app.listen(port, () => {
  sync();
  console.log(`Auth service listening at http://localhost:${port}`);
});


module.exports = server