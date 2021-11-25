const express = require("express");
require('dotenv').config()
const mongoose = require('./app/configs/mongoose')

const customerRoute = require("./app/routers/orderRouter");
const app = express();
//Connecting to DB
mongoose.connect()

//Used to parse requests into json form -- During POST
app.use(express.json());

//Register User Router and Task Router
app.use(customerRoute);

module.exports = app;