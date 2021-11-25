const express = require("express");
const auth = require('../middleware/auth').auth
const adminVerify = require('../middleware/verificationRole').adminVerify
const staffVerify = require('../middleware/verificationRole').staffVerify
const orderController = require("../controllers/orderController")
const router = new express.Router();

router.post("/order/", orderController.placeOrder);
router.get("/order/:id", orderController.getOrder);
router.get("/order/", orderController.getAllOrders);
router.patch("/order/:id", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);
module.exports = router;
