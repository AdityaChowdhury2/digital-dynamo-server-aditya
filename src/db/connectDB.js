const mongoose = require('mongoose');
require('dotenv').config();

const getConnectionString = () => {
    let connectionURI;
    if (process.env.NODE_ENV === 'production') {
        connectionURI = process.env.MONGO_URI_PROD
        connectionURI = connectionURI.replace('<username>', process.env.MONGO_USER)
        connectionURI = connectionURI.replace('password', process.env.MONGO_PASS)
    }
    else {
        connectionURI = process.env.MONGO_URI_LOCAL
    }
    return connectionURI
}

const connectDb = async () => {
    const uri = getConnectionString();
    await mongoose.connect(uri, { dbName: process.env.DB_NAME })
    console.log("Connected to database");
}
module.exports = connectDb;