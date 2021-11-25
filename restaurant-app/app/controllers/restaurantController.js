const restaurantService = require('../services/restaurantService')
const createRestaurant = async (req, res) => {
    if (req.body) {
        try {
            const restaurant = await restaurantService.saveRestaurant(req.body)
            res.status(201).send(restaurant);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

const getAllRestaurants = async (req, res) => {
    try {
        const restaurantList = await restaurantService.getAllRestaurants(req.query);
        res.status(200).json({
            data: JSON.parse(JSON.stringify(restaurantList))
        });
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const getSingleRestaurant = async (req, res) => {
    const _id = req.params.id;
    try {
        const restaurant = await restaurantService.getSingleRestaurant(_id);
        if (!restaurant) return res.status(404).send({ "error": `Restautant with id ${_id} not available` });
        res.send(restaurant);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateRestaurant = async (req, res) => {
    const reqRestaurantBody = Object.keys(req.body);
    const customRestaurantKeys = ["name", "location", "distance", "cuisine", "budget", "rating", "menu"];
    let isAllowedUpdate = reqRestaurantBody.every((restaurantKey) =>
        customRestaurantKeys.includes(restaurantKey)
    );
    if (!isAllowedUpdate)
        return res
            .status(400)
            .send({ error: "Invalid Request! Please update valid parameters." });
    try {
        /* const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        }); */
        const restaurantToUpdate = await restaurantService.getSingleRestaurant(req.params.id);
        if (!restaurantToUpdate)
            return res.status(404).send({ error: "Invalid ID! Restaurant not found" });
        reqRestaurantBody.forEach((key) => (restaurantToUpdate[key] = req.body[key]));
        await restaurantService.saveRestaurant(restaurantToUpdate);
        res.status(201).send(restaurantToUpdate);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await restaurantService.deleteRestaurant(req.params.id);
        if (!deletedRestaurant) return res.status(404).send({ error: "Restaurant not found" });
        res.status(200).send(deletedRestaurant);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getSingleRestaurant,
    updateRestaurant,
    deleteRestaurant
}