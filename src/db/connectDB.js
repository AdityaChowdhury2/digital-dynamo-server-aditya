const mongoose = require('mongoose');
require('dotenv').config();

const getConnectionString = () => {
    let connectionURI;
    let dbName;
    if (process.env.NODE_ENV === 'production') {
        connectionURI = process.env.MONGO_URI_PROD
        connectionURI = connectionURI.replace('<username>', process.env.MONGO_USER)
        connectionURI = connectionURI.replace('password', process.env.MONGO_PASS)
        dbName = process.env.PROD_DB_NAME
    }
    else {
        connectionURI = process.env.MONGO_URI_LOCAL
        dbName = process.env.LOCAL_DB_NAME
    }
    return { connectionURI, dbName }
}

const connectDb = async () => {
    const { connectionURI: uri, dbName } = getConnectionString();
    await mongoose.connect(uri, { dbName })
    console.log(`Connected to database ${dbName}`);
}
module.exports = connectDb;