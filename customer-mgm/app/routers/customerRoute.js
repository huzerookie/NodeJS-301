const express = require("express");
const auth = require('../middleware/auth')
const adminVerify = require('../middleware/verificationRole').adminVerify
const staffVerify = require('../middleware/verificationRole').staffVerify
const restaurantController = require("../controllers/customerController")
const router = new express.Router();

router.post("/customer/register", customerController.registerCustomer);
router.post("/customer/login", customerController.loginCustomer);
router.get("/customer/:id", [auth, staffVerify], customerController.getCustomer);
router.get("/customer/", [auth, adminVerify], customerController.getCustomers);
router.patch("/customer/:id", [auth, staffVerify], customerController.updateCustomer);
router.delete("/customer/:id", [auth, staffVerify], customerController.deleteCustomer);

module.exports = router;
