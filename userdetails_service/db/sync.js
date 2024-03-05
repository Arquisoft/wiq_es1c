const db = require('./database');

// Load the models so their tables are sync
const User = require('./models/user');

const sync = async () => {
    try {
        await db.sync();
        console.log('Database and tables synced!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

module.exports = sync;