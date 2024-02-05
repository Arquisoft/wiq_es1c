const express = require('express');
const bodyParser = require('body-parser');
const geoGen = require('./questionGenerators/GeoGenerator')

const app = express();
const port = 23123;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.get('/generate', async (req, res) => {
  res.status(200).json(await geoGen())
});

const server = app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


module.exports = server