module.exports = {
    adminVerify: async (req, res, next) => {
        try {
            if (req.customer.role === 'ADMIN') {
                next();
            }
            throw new Error()
        } catch (e) {
            res.status(401).send({ error: "Operation Forbidden" })
        }
    },
    staffVerify: async (req, res, next) => {
        try {
            if (req.customer.role === 'STAFF') {
                next();
            }
            throw new Error()
        } catch (e) {
            res.status(401).send({ error: "Operation Forbidden" })
        }
    }
}