const Restaurant = require('../models/orderManagement.model')
const restaurantUtil = require('../utils/restaurantUtil')
const saveRestaurant = async (body) => await new Restaurant(body).save()
const getSingleRestaurant = async (_id) => await Restaurant.findById(_id)
const deleteRestaurant = async (_id) => await Restaurant.findByIdAndDelete(_id)
const getAllRestaurants = async (queryParams) => {
    const sortBy = !(queryParams.sortBy == null) ? queryParams.sortBy : 'name';
    const sortOrder = !(queryParams.sortOrder == null) && queryParams.sortOrder === 'desc' ? -1 : 1;
    const limit = queryParams.limit == null ? 10 : queryParams.limit;
    const restaurantObj = restaurantUtil.restaurantQueryBuilder(queryParams);
    console.log(restaurantObj)
    return await Restaurant.find(restaurantObj).sort({ sortBy: sortOrder }).limit(limit)
}
module.exports = {
    saveRestaurant,
    getAllRestaurants,
    getSingleRestaurant,
    deleteRestaurant
}