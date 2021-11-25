const Order = require('../models/orderModel')

const saveOrder = async (body) => await new Order(body).save()
const getOrder = async (_id) => await Order.findById(_id)
module.exports = {
    saveOrder,
    getOrder
}