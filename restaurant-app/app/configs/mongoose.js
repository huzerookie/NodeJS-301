const mongoose = require("mongoose");
require('dotenv').config();
const mongooseURL = /* process.env.MONGODB_URI || */ 'mongodb://127.0.0.1:27017/restaurant-db';
const connect = async () => {
    return await mongoose.connect(mongooseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async (connection) => {
        console.log(mongooseURL)
        console.log("connection successful");
    }).catch((e) => {
        console.log(e);
    });
}

const close = () => mongoose.disconnect()

module.exports = {
    connect,
    close
}