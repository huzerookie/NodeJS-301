const Restaurant = require('../models/restaurantModel')

const saveRestaurant = async (body) => await new Restaurant(body).save()
const getAllRestaurants = async () => await Restaurant.find({})
const getSingleRestaurant = async (_id) => await Restaurant.findById(_id)
const deleteRestaurant = async (_id) => await Restaurant.findByIdAndDelete(_id)

module.exports = {
    saveRestaurant,
    getAllRestaurants,
    getSingleRestaurant,
    deleteRestaurant
}