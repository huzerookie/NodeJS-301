const express = require("express");
const auth = require('../middleware/auth')
const staffVerify = require('../middleware/verificationRole').staffVerify
const restaurantController = require("../controllers/restaurantController")
const router = new express.Router();

router.post("/restaurants", [auth, staffVerify], restaurantController.createRestaurant);
router.get("/restaurants", auth, restaurantController.getAllRestaurants);
router.get("/restaurants/:id", auth, restaurantController.getSingleRestaurant);
router.patch("/restaurants/:id", [auth, staffVerify], restaurantController.updateRestaurant);
router.delete("/restaurants/:id", [auth, staffVerify], restaurantController.deleteRestaurant);

module.exports = router;
