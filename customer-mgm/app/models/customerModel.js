const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { menuSchema } = require('./menuModel')
//mongoose.set('debug', true);

/* require('../configs/mongoose.js') */
/*By default mongoose creates a schema. We can create a custom schema,
and can decide what to do with object just before or after getting saved*/
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
    console.log(`In generateTokenAuth():${token}`);
    customer.tokens.push({ token });
    await customer.save();
    return customer;
};


customerSchema.statics.findByCredentials = async (email, password) => {
    const customer = await Customer.findOne({ email });
    if (!customer) throw new Error("Unable to login");
    const isValid = await bcrypt.compare(password, customer.password);
    if (!isValid) throw new Error("Unable to login");
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
