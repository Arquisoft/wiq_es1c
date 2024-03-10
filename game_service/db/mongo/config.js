const mongoose = require("mongoose");


const connect = async() =>
{
    try 
    {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/wiq');
        //await mongoose.connect('mongodb://localhost:27017/wiq');

        console.log('MongoDB connected');
    } 
    catch(error) {
        console.log(error);
        throw new Error('Error to connect with MongoDB');
    }
}

module.exports = connect;