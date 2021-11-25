const express = require("express");
const auth = require('../middleware/auth').auth
const orderController = require("../controllers/orderController")
const router = new express.Router();

router.post("/order/", orderController.placeOrder);
router.get("/order/:id", orderController.getOrder);

module.exports = router;
