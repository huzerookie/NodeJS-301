const Customer = require('../models/customerModel')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authroization").replace("Bearer", "")
        const decoded = jwt.verify(token, "ThisIsAGeneratedToken")
        const customer = await User.findOne({ _id: decoded._id, "tokens.token": token })
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