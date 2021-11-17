const express = require("express");
require('dotenv').config()
const restaurantRoute = require("./restaurant-app/app/routers/restaurantRoute");
const app = express();
const port = process.env.PORT || 3000;
//Connecting to DB
require("./restaurant-app/app/configs/mongoose");

//Middleware next()
/* app.use((req, res, next) => {
    res.status(503).send("Server under maintenance");
    // next();
}); */

//Used to parse requests into json form -- During POST
app.use(express.json());

//Register User Router and Task Router
app.use(restaurantRoute);

app.listen(port, () => console.log(`Server started at port ${port}`));
