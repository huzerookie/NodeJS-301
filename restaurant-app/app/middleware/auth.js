const jwt = require('jsonwebtoken')
const axios = require('axios')
module.exports = {
    auth: async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "")
            const decoded = jwt.verify(token, "ThisIsAGeneratedToken")
            const customer = await axios.get('http://localhost:4000/customer/' + decoded._id, { headers: { Authorization: req.header("Authorization") } })
            req.customer = customer.data;
            req.token = token;
            next()
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

