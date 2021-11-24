const mongoose = require("mongoose");
require('dotenv').config();
const mongooseURL = /* process.env.MONGODB_URI || */ 'mongodb://127.0.0.1:27017/customer-db';
const connect = () => {
    if (process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(mongooseURL,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    })
                    .then(async (connection) => {
                        console.log(mongooseURL)
                        console.log("connection successful to test db mockgoose");
                    }).catch((e) => {
                        console.log(e);
                    });
            })
    } else {
        mongoose.connect(mongooseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(async (connection) => {
            console.log(mongooseURL)
            console.log("connection successful");
        }).catch((e) => {
            console.log(e);
        });
    }
}
const close = () => mongoose.disconnect()

module.exports = {
    connect,
    close
}