const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async() =>
{
    try 
    {
        if (process.env.DB_URL) {
            await mongoose.connect('mongodb://mongodb:27017/templates')
            console.log("MongoDB Server Selected")
        } else {
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri)
            
            console.log("MongoDB RAM MEMORY SERVER Selected")
        }

        console.log('MongoDB connected');
    } 
    catch(error) {
        console.log(error);
        throw new Error('Error to connect with MongoDB');
    }
}

module.exports = connect;