const restaurantQueryBuilder = (queryParams) => {
    const restaurantObj = {};
    addParamToObj("name", queryParams.name, restaurantObj);
    addParamToObj("location", queryParams.location, restaurantObj);
    addParamToObj("distance.0.longitude", queryParams.longitude, restaurantObj);
    addParamToObj("distance.0.latitude", queryParams.latitude, restaurantObj);
    addArrayToObj("menu.dishName", queryParams.dishName, restaurantObj);
    addArrayToObj("menu.dishPrice", queryParams.dishPrice, restaurantObj);
    addArrayToObj("cuisine", queryParams.cuisine, restaurantObj);
    return restaurantObj;
}
const addParamToObj = (paramKey, paramValue, obj) => {
    if (!(paramValue == null))
        obj[paramKey] = paramValue;
    return;
}
const addArrayToObj = (arrayKey, arrayValue, obj) => {
    if (!arrayValue) return;
    const arrayElements = arrayValue.split(",")
    if (Array.isArray(arrayElements) && arrayElements.length > 0) {
        obj[arrayKey] = { $in: arrayElements }
    }
}

module.exports = {
    restaurantQueryBuilder
}