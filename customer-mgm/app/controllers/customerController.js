const customerService = require('../services/customerService')

const registerCustomer = async (req, res) => {
    if (req.body) {
        try {
            const customer = await customerService.saveCustomer(req.body)
            await customer.generateTokenAuth()
            res.status(201).send(customer);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

const loginCustomer = async (req, res) => {
    if (req.body) {
        try {
            const customer = await customerService.getCredentials(req.body.email, req.body.password)
            await customerService.generateTokenAuth(customer)
            res.status(200).send(customer);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}
const getCustomers = async (req, res) => {
    try {
        const customerList = await customerService.getAllCustomers();
        res.status(200).send(customerList);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const getCustomer = async (req, res) => {
    const _id = req.params.id;
    try {
        const customer = await customerService.getCustomer(_id);
        if (!customer) return res.status(404).send({ "error": `Customer with id ${_id} not available` });
        res.send(customer);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateCustomer = async (req, res) => {
    const reqCustomerBody = Object.keys(req.body);
    const customCustomerKeys = ["name", "password"];
    let isAllowedUpdate = reqCustomerBody.every((customerKey) =>
        customCustomerKeys.includes(customerKey)
    );
    if (!isAllowedUpdate)
        return res
            .status(400)
            .send({ error: "Invalid Request! Please update valid parameters." });
    try {
        const customerToUpdate = await customerService.getCustomer(req.params.id);
        if (!customerToUpdate)
            return res.status(404).send({ error: "Invalid ID! Customer not found" });
        reqCustomerBody.forEach((key) => (customerToUpdate[key] = req.body[key]));
        await customerService.saveCustomer(customerToUpdate);
        res.status(201).send(customerToUpdate);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customerService.deleteCustomer(req.params.id);
        if (!deletedCustomer) return res.status(404).send({ error: "Customer not found" });
        res.status(200).send(deletedCustomer);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
}