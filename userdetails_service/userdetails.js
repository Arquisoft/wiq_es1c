// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// My own libs
const authMiddleware = require('./auth/authMiddleware');
const sync = require("./db/sync");
const {getUsername} = require("./userdetails/endpoints");

const port = 8004;
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
app.use(authMiddleware); // Auth middleware for the user details API

// Api endpoints
app.post('/api/userdetails/name', getUsername);

// Start the server
const server = app.listen(port, () => {
    sync();
    console.log(`User details service listening at http://localhost:${port}`);
});


module.exports = server