module.exports = {
    adminVerify: (req, res, next) => {
        try {
            console.log(req.customer.role)
            if (req.customer.role === 'ADMIN') {
                return next();
            }

            throw new Error()
        } catch (e) {
            res.status(401).send({ error: "Operation Forbidden" })
        }
    },
    staffVerify: (req, res, next) => {
        try {
            if (req.customer.role === 'STAFF') {
                return next();
            }
            throw new Error()
        } catch (e) {
            res.status(401).send({ error: "Operation Forbidden" })
        }
    }
}