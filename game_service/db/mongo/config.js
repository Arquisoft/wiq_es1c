const mongoose = require("mongoose");


const connect = async() =>
{
    try 
    {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB connected');
    } 
    catch(error) {
        console.log(error);
        throw new Error('Error to connect with MongoDB');
    }
}

module.exports = connect;