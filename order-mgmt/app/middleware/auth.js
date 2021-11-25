const Customer = require('../models/customerModel')
const jwt = require('jsonwebtoken')

module.exports = {
    auth: async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "")
            const decoded = jwt.verify(token, "ThisIsAGeneratedToken")
            const customer = await Customer.findOne({ _id: decoded._id, "tokens.token": token })
            if (!customer) {
                throw new Error()
            }
            req.customer = customer;
            req.token = token;
            next()
        } catch (e) {
            res.status(401).send({ error: "Kindly Authenticate!" })
        }
    }
}