const express = require('express');
const applyMiddlewares = require('./middlewares/applyMiddlewares');
const connectDb = require('./db/connectDB');
const globalErrorHandler = require('./utils/globalErrorHandler');
require('dotenv').config();
const brandRoute = require('./routes/v1/brands')

const app = express();
const port = process.env.PORT || 5000;

applyMiddlewares(app);

app.use(brandRoute);


app.get('/health', (req, res) => {
    res.send("Running");
})

//handle all unhandled routes
app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
})

app.use(globalErrorHandler)

const main = async () => {
    await connectDb();
    app.listen(port, () => {
        console.log("Listening on port " + port);
    })
}

main();
