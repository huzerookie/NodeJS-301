const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//mongoose.set('debug', true);

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password"))
                throw new Error("Please enter a strong password");
        },
    },
    role: {
        type: String,
        uppercase: true,
        required: true,
        validate(value) {
            const roles = ["ADMIN", "STAFF", "USER"]
            if (!roles.includes(value.toUpperCase())) {
                throw new Error("Invalid Role")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

customerSchema.methods.generateTokenAuth = async function () {
    const customer = this;
    const token = jwt.sign({ _id: customer._id.toString() }, "ThisIsAGeneratedToken");
    customer.tokens.push({ token });
    await customer.save();
    return customer;
};


customerSchema.statics.findByCredentials = async (email, password) => {
    const customer = await Customer.findOne({ email });
    if (!customer) throw new Error("Unable to login");
    console.log(customer)
    const isValid = await bcrypt.compare(password, customer.password);
    console.log("isValid:" + isValid)
    if (!isValid) throw new Error("Unable to login");
    console.log("comes till here findBycredentials")
    return customer;
};

customerSchema.pre("save", async function (next) {
    const customer = this;
    if (customer.isModified("password")) {
        customer.password = await bcrypt.hash(customer.password, 8);
    }
    next();
});

const Customer = mongoose.model("Customer", customerSchema, 'customer');

module.exports = Customer;
