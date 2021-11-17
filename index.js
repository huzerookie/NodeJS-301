const restaurantData = require('./restaurant-app/app/utils/restaurantApi.json')
const menuGenerator = require('./restaurant-app/app/utils/singleMenu.js')
const fs = require('fs')

var restaurantList = [];
/* console.log(restaurantData.results.data[0].name)
console.log(restaurantData.results.data[0].location_string)
console.log(restaurantData.results.data[0].latitude)
console.log(restaurantData.results.data[0].longitude)
console.log(restaurantData.results.data[0].cuisine.name)
console.log(restaurantData.results.data[0].price)
console.log(restaurantData.results.data[0].rating)
 */

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
