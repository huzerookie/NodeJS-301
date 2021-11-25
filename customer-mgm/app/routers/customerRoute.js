const express = require("express");
const auth = require('../middleware/auth').auth
const adminVerify = require('../middleware/verificationRole').adminVerify
const staffVerify = require('../middleware/verificationRole').staffVerify
const customerController = require("../controllers/customerController")
const router = new express.Router();

router.post("/customer/register", customerController.registerCustomer);
router.post("/customer/login", customerController.loginCustomer);
router.get("/customer/:id", [auth, staffVerify], customerController.getCustomer);
router.get("/customer/", [auth, adminVerify], customerController.getCustomers);
router.patch("/customer/:id", [auth, staffVerify], customerController.updateCustomer);
router.delete("/customer/:id", [auth, staffVerify], customerController.deleteCustomer);
router.post("/customer/logout", [auth], customerController.logoutCustomer)
router.post("/customer/logoutAll", [auth], customerController.logoutAllCustomers)
module.exports = router;
