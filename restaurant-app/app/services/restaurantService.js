const Restaurant = require('../models/restaurantModel')
const restaurantUtil = require('../utils/restaurantUtil')
const saveRestaurant = async (body) => await new Restaurant(body).save()
const getSingleRestaurant = async (_id) => await Restaurant.findById(_id)
const deleteRestaurant = async (_id) => await Restaurant.findByIdAndDelete(_id)
const getAllRestaurants = async (queryParams) => {
    const skip = !(queryParams.skip == null) ? parseInt(queryParams.skip) : 0;
    const sortBy = !(queryParams.sortBy == null) ? queryParams.sortBy : 'name';
    const sortOrder = !(queryParams.sortOrder == null) && queryParams.sortOrder === 'desc' ? -1 : 1;
    const limit = queryParams.limit == null ? 10 : parseInt(queryParams.limit);
    const restaurantObj = restaurantUtil.restaurantQueryBuilder(queryParams);
    const restaurants = await Restaurant.find(restaurantObj).sort({ sortBy: sortOrder }).limit(limit).skip(skip)
    const totalRestaurants = await Restaurant.find().count()
    const data = {};
    data.totalRestaurants = totalRestaurants
    data.count = restaurants.length
    data.restaurants = restaurants;
    return data;
}
module.exports = {
    saveRestaurant,
    getAllRestaurants,
    getSingleRestaurant,
    deleteRestaurant
}