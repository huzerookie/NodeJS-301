require('dotenv').config()
const fetchPrice = require('../utils/orderUtil').fetchPrice
const fetchDishes = require('../utils/orderUtil').fetchDishes
const orderService = require('../services/orderService')
const axios = require('axios')

const placeOrder = async (req, res) => {
    if (req.body.restaurant && (Array.isArray(req.body.dishes) && req.body.dishes.length > 0)) {
        try {
            const orderedDishes = req.body.dishes.map(e => e.dishName).join(',')
            const body = await axios.create({
                baseURL: 'http://localhost:3000'
            }).get('/restaurants', {
                params: {
                    name: req.body.restaurant,
                    dishName: orderedDishes
                }
            })
            const restaurant = body.data.restaurants[0]
            const dishes = fetchDishes(restaurant, orderedDishes, req.body.dishes)
            const price = fetchPrice(dishes)
            const orderObj = {}
            orderObj.restaurant = restaurant._id
            orderObj.price = price
            orderObj.dishes = dishes
            const order = await orderService.saveOrder(orderObj)
            res.status(201).send(order)
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await orderService.getOrder(req.params.id)
        if (!order) return res.status(404).send({ error: "Order Unavailable" })
        res.status(200).send(order)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: "Internal Server Error" })
    }
}

module.exports = {
    placeOrder,
    getOrder
}