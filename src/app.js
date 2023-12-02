const express = require('express');
const applyMiddlewares = require('./middlewares/applymiddlewares');
const connectDb = require('./db/connectDB');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

applyMiddlewares(app);

app.get('/health', (req, res) => {
    res.send("Running");
})

const main = async () => {
    await connectDb();
    app.listen(port, (req, res) => {
        console.log("Listening on port " + port);
    })
}

main();
