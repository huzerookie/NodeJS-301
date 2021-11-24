const express = require("express");
require('dotenv').config()
const mongoose = require('./app/configs/mongoose')

const restaurantRoute = require("./app/routers/customerRoute");
const app = express();
//Connecting to DB
mongoose.connect()

//Middleware next()
/* app.use((req, res, next) => {
    res.status(503).send("Server under maintenance");
    // next();
}); */

//Used to parse requests into json form -- During POST
app.use(express.json());

//Register User Router and Task Router
app.use(restaurantRoute);

module.exports = app;