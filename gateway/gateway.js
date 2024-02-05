const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.status(200).send("<p>hi!</p>")
});

const server = app.listen(port, () => {
  console.log(`Question Service listening at http://localhost:${port}`);
});


module.exports = server