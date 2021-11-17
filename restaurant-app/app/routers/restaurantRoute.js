const express = require("express");
const restaurantController = require("../controllers/restaurantController")
const router = new express.Router();

router.post("/restaurants", restaurantController.createRestaurant);
router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurants/:id", restaurantController.getSingleRestaurant);
router.patch("/restaurants/:id", restaurantController.updateRestaurant);
router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

module.exports = router;
