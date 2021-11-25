const bcrypt = require('bcrypt')
module.exports = {
    fetchDishes: (restaurant, orderedDishes, dishes) => {
        if (!restaurant) throw new Error("Invalid Request")
        const restaurantDishes = restaurant.menu.flatMap(e => e.dishName)
        const isDishesPresent = orderedDishes.split(',').every(dish => restaurantDishes.includes(dish));
        if (!isDishesPresent) throw new Error("Invalid Request")
        for (dish of dishes) {
            const restaurantDish = restaurant.menu.find(e => e.dishName[0] == dish.dishName)
            dish.dishPrice = restaurantDish.dishPrice[0]
        }
        return dishes
    },
    fetchPrice: (dishes) => dishes.map(e => e.dishPrice).reduce((acc, sum) => acc + sum),
}