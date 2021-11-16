const express = require("express");
const restaurantController = require("../controllers/restaurantController")
const router = new express.Router();
const Restaurant = require("../models/restaurantModel");

router.post("/restaurants", restaurantController.createRestaurant);

router.get("/restaurants", restaurantController.getAllRestaurants);

router.get("/restaurants/:id", restaurantController.getSingleRestaurant);

//Update Restaurant using PATCH request
router.patch("/restaurants/:id", restaurantController.updateRestaurant);

//Delete Restaurant using DELETE Request
router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

module.exports = router;
