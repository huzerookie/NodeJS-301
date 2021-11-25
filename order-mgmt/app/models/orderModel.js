const mongoose = require('mongoose')
//mongoose.set('debug', true);

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    dishes:
        [{
            dishName: {
                type: String,
                required: true,
                trim: true
            },
            dishPrice: {
                type: Number,
                required: true,
                trim: true
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


const Order = mongoose.model("Order", orderSchema, 'order');

module.exports = Order;
