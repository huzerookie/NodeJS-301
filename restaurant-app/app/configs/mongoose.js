const mongoose = require("mongoose");
require('dotenv').config();
const mongooseURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant-db';
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connection) => {
    console.log(mongooseURL)
    console.log("connection successful");
}).catch((e) => { console.log(e);
     process.exit(-1);});


