const express = require("express");
const auth = require('../middleware/auth').auth
const orderController = require("../controllers/orderController")
const router = new express.Router();

router.post("/order/", auth, orderController.placeOrder);
router.get("/order/:id", auth, orderController.getOrder);

module.exports = router;
