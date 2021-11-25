const express = require("express");
require('dotenv').config()
var cors = require('cors')
const mongoose = require('./app/configs/mongoose')

const orderRoute = require("./app/routers/orderRouter");
const app = express();

//Connecting to DB
mongoose.connect()

//Used to parse requests into json form -- During POST
app.use(express.json());

//Register User Router and Task Router
app.use(orderRoute);

//Register CORS
app.use(cors())

module.exports = app;