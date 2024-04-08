const { MongoMemoryServer } = require('mongodb-memory-server');

let auth_service;
let game_service;
let question_service;
let userdetails_serivce;

async function startServer() {
    console.log('Starting auth memory server...');
    auth_service = await require("../../auth_service/auth");
    game_service = await require("../../game_service/game");
    question_service = await require("../../question_service/question");
    userdetails_serivce = await require("../../userdetails_serivce/userdetails");
}

startServer();
