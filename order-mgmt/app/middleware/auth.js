const jwt = require('jsonwebtoken')

module.exports = {
    auth: async (req, res, next) => {
        try {
            const customer = await axios.post("http://localhost:4000/isAuthenticated")
            next()
        } catch (e) {
            res.status(401).send({ error: "Kindly Authenticate!" })
        }
    }
}