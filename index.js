const express = require("express");
require('dotenv').config()
const mongoose = require('./restaurant-app/app/configs/mongoose')

const restaurantRoute = require("./restaurant-app/app/routers/restaurantRoute");
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