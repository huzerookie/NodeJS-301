const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//mongoose.set('debug', true);

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant"
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    dish:
        [{
            order: {
                type: moongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Menu"
            },
            qty: {
                type: Number,
                required: true,
                validate(value) {
                    if (!value) throw new Error("Invalid Quantity")
                }
            }
        }],
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (!value) throw new Error("Invalid Price")
        }
    },
}, {
    timestamps: true
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
