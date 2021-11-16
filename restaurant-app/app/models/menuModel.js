const mongoose = require('mongoose')
const menuSchema = mongoose.Schema({
    dishName: String,
    dishPrice: Number,
    dishImage: Buffer
})

module.exports = {
    menuSchema
}