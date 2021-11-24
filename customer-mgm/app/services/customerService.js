const Customer = require('../models/customerModel')

const saveCustomer = async (body) => await new Customer(body).save()
const getCredentials = async (email, password) => await Customer.findByCredentials(email, password)
const generateTokenAuth = async (customer) => await customer.generateTokenAuth()
const getCustomer = async (_id) => await Restaurant.findById(_id)
const deleteCustomer = async (_id) => await Restaurant.findByIdAndDelete(_id)
const getAllCustomers = async () => await Customer.find({})

module.exports = {
    saveCustomer,
    getCredentials,
    generateTokenAuth,
    getCustomer,
    deleteCustomer,
    getAllCustomers
}