module.exports = {

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