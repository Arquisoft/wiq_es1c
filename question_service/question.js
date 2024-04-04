// External libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')

// My own libs
const db = require("./db/mongo/config");
const {loadInitialTemplates, getRandomTemplate} = require("./db/mongo/utils");
const processTemplate = require("./questions/templateProcessor");

const port = 8002;
const app = express();

//Prometheus configuration
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Middleware 
app.use(bodyParser.json()); // Parse the request into json
app.use(cors()) // This api is listening on a different port from the frontend
//app.use(authMiddleware); // Auth middleware for the questions API

// Api endpoints
// Question endpoints
app.post('/api/questions/generate', async (req, res) => {
  try {
    res.status(200).json((await processTemplate(await getRandomTemplate()))); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Read the OpenAPI YAML file synchronously
openapiPath='./openapi.yaml'
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}

// Start the server
const server = app.listen(port, () => {
  db().then(loadInitialTemplates);
  console.log(`Questions service listening at http://localhost:${port}`);
});


module.exports = server
