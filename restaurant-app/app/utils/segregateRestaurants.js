const restaurantData = require('./restaurantApi.json')
const menuGenerator = require('./singleMenu.js')
const fs = require('fs')

var restaurantList = [];
let restaurantObj = {};
restaurantData.results.data.forEach((e) => {
    let restaurantObj = {}
    restaurantObj.name = e.name;
    restaurantObj.location = e.location_string;

    restaurantObj.distance = {};
    restaurantObj.distance.longitude = e.longitude;
    restaurantObj.distance.latitude = e.latitude;

    restaurantObj.cuisine = e.cuisine.map(c => c.name);
    restaurantObj.budget = e.price;
    restaurantObj.rating = e.rating;
    restaurantObj.menu = menuGenerator.getMenu();

    restaurantList.push(restaurantObj)
})


fs.writeFileSync("restaurantList.json", JSON.stringify(restaurantList))
