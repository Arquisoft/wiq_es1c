const { MongoMemoryServer } = require('mongodb-memory-server');



let auth_service;

async function startServer() {
    console.log('Starting auth memory server...');

    auth_service = await require("../../auth_service/auth");
}

startServer();
