const db = require('./database');

// Load the models so their tables are sync
const User = require('./models/user');
const Game = require('./models/game');
const Question = require('./models/question');

const sync = async () => {
    console.log('DB sync in progress');
    try {
        await db.sync({force: false});
        console.log('Database and tables synced!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

module.exports = sync;