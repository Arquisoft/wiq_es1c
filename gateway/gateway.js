const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
const port = 80;


const sequelize = new Sequelize('db', 'root', '', {
    host: 'mariadb',
    port: 3306,
    dialect: 'mariadb'
})

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.status(200).send("<p>hi!</p>")
});

const server = app.listen(port, () => {
    sequelize.authenticate();
    console.log(`Gateway listening at http://localhost:${port}`);
});


module.exports = server