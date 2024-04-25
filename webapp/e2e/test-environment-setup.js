const { spawn } = require('child_process');
const fs = require("fs");

async function startServer() {
    const questionProcess = spawn('node', ['../question_service/question.js']);
    const authProcess = spawn('node', ['../auth_service/auth.js']);
    const gameProcess = spawn('node', ['../game_service/game.js']);
    const userDetailsProcess = spawn('node', ['../userdetails_service/userdetails.js']);

    function logOutput(processName, data) {
        console.log(`${processName} output: ${data}`);
    }

    function logError(processName, data) {
        console.error(`${processName} error: ${data}`);
    }

    function logClose(processName, code) {
        console.log(`${processName} process exited with code ${code}`);
    }

    authProcess.stdout.on('data', (data) => logOutput('Auth', data));
    authProcess.stderr.on('data', (data) => logError('Auth', data));
    authProcess.on('close', (code) => logClose('Auth', code));

    gameProcess.stdout.on('data', (data) => logOutput('Game', data));
    gameProcess.stderr.on('data', (data) => logError('Game', data));
    gameProcess.on('close', (code) => logClose('Game', code));

    questionProcess.stdout.on('data', (data) => logOutput('Question', data));
    questionProcess.stderr.on('data', (data) => logError('Question', data));
    questionProcess.on('close', (code) => logClose('Question', code));

    userDetailsProcess.stdout.on('data', (data) => logOutput('UserDetails', data));
    userDetailsProcess.stderr.on('data', (data) => logError('UserDetails', data));
    userDetailsProcess.on('close', (code) => logClose('UserDetails', code));
}

fs.copyFile('./e2e/tests/auth', './testDBAuth.sqlite', (err) => {
    if (err) throw err;
    fs.copyFile('./e2e/tests/game', './testDBGame.sqlite', (err) => {
        if (err) throw err;
        fs.copyFile('./e2e/tests/templates', './templates.json', (err) => {
            if (err) throw err;
            startServer();
        });
    });
});

