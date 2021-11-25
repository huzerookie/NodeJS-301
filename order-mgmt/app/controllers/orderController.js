const orderService = require('../services/orderService')
require('dotenv').config()

//re.body contains name of restaurant and array of dishNames
const placeOrder = async (req, res) => {
    if (req.body.restaurant && (Array.isArray(req.body.dishes) && req.body.dishes.length > 0)) {
        try {
            const restaurant = await axios.get(encodeURI(process.env.RESTAURANT_APP + "name=" + restaurant + "&dishName=" + dishes))
            if (!restaurant) res.status(404).send({ error: "Invalid Request" })
            const restaurantDishes = restaurant.menu.map(e => e.dishName)
            const isDishesPresent = dishes.split(',').every(dish => restaurantDishes.includes(dish));
            if (!isDishesPresent) res.status(404).send(error: "Invalid Request")

            res.status(201).send(customer);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

const loginCustomer = async (req, res) => {

    try {
        if (req.body) {
            console.log(req.body.email)
            console.log(req.body.password)
            const customer = await customerService.getCredentials(req.body.email, req.body.password)
            console.log(customer)
            await customer.generateTokenAuth()
            res.status(200).send(customer);
        }
    } catch (e) {
        res.status(400).send(e);
    }
}
const getCustomers = async (req, res) => {
    try {
        const customerList = await customerService.getAllCustomers();
        res.status(200).send(customerList);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const getCustomer = async (req, res) => {
    const _id = req.params.id;
    try {
        const customer = await customerService.getCustomer(_id);
        if (!customer) return res.status(404).send({ "error": `Customer with id ${_id} not available` });
        res.send(customer);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateCustomer = async (req, res) => {
    const reqCustomerBody = Object.keys(req.body);
    const customCustomerKeys = ["name", "password"];
    let isAllowedUpdate = reqCustomerBody.every((customerKey) =>
        customCustomerKeys.includes(customerKey)
    );
    if (!isAllowedUpdate)
        return res
            .status(400)
            .send({ error: "Invalid Request! Please update valid parameters." });
    try {
        const customerToUpdate = await customerService.getCustomer(req.params.id);
        if (!customerToUpdate)
            return res.status(404).send({ error: "Invalid ID! Customer not found" });
        reqCustomerBody.forEach((key) => (customerToUpdate[key] = req.body[key]));
        await customerService.saveCustomer(customerToUpdate);
        res.status(201).send(customerToUpdate);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customerService.deleteCustomer(req.params.id);
        if (!deletedCustomer) return res.status(404).send({ error: "Customer not found" });
        res.status(200).send(deletedCustomer);
    } catch (e) {
        res.status(500).send(e);
    }
}

const logoutCustomer = async (req, res) => {
    try {
        req.customer.tokens = req.customer.tokens.filter(e => e.token != req.token)
        await customerService.saveCustomer(req.customer)
        res.status(200).send({ message: "Loggged Out Successfully!" })
    } catch (e) {
        res.status(404).send({ error: "Invalid Operation" })
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    logoutCustomer
}