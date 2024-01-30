const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 23123;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.get('/generate', async (req, res) => {
    res.status(200)
    .json({
      "titulo": "Cual es la capital de asturias",
      "respuesta": "Oviedo",
      "respuestasFalsas" : [
        "Madrid",
        "Sevilla"
      ]
    })
});

const server = app.listen(port, () => {
  console.log(`Question Service listening at http://localhost:${port}`);
});


module.exports = server