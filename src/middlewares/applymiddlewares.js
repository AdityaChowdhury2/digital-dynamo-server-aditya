const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const { LOCAL_CLIENT, CLIENT } = require('../config/default');
const applyMiddlewares = (app) => {
    app.use(cors(
        {
            origin: [LOCAL_CLIENT, CLIENT]
        }
    ));
    app.use(express.json())
    app.use(cookieParser());
}

module.exports = applyMiddlewares