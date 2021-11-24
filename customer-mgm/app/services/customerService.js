const Customer = require('../models/customerModel')

const saveCustomer = async (body) => await new Customer(body).save()
const getCredentials = async (email, password) => {
    try {
        const customer = await Customer.findByCredentials(email, password);
        console.log("in getCredentials service")
        return customer
    }
    catch (e) {
        console.log(e)
    }
}
const generateTokenAuth = async (customer) => await customer.generateTokenAuth()
const getCustomer = async (_id) => await Customer.findById(_id)
const deleteCustomer = async (_id) => await Customer.findByIdAndDelete(_id)
const getAllCustomers = async () => await Customer.find({})

module.exports = {
    saveCustomer,
    getCredentials,
    generateTokenAuth,
    getCustomer,
    deleteCustomer,
    getAllCustomers
}