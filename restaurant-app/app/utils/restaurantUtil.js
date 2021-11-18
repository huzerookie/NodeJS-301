const restaurantQueryBuilder = (queryParams) => {
    const restaurantObj = {};
    addParamToObj("name", queryParams.name, restaurantObj);
    addParamToObj("location", queryParams.location, restaurantObj);
    addParamToObj("distance.0.longitude", queryParams.longitude, restaurantObj);
    addParamToObj("distance.0.latitude", queryParams.latitude, restaurantObj);
    addParamToObj("menu.0.dishName", queryParams.dishName, restaurantObj);
    addParamToObj("menu.0.dishPrice", queryParams.dishPrice, restaurantObj);
    return restaurantObj;
}
const addParamToObj = (paramKey, paramValue, obj) => {
    if (!(paramValue == null))
        obj[paramKey] = paramValue;
    return;
}

const buildQueryForCuisine = (cuisineList, restaurantObj) => {
    const cuisineObjList = []
    for (let cuisine of cuisineList) {
        cuisineObjList.push({ cuisine: "$in" })
    }
}

module.exports = {
    restaurantQueryBuilder
}