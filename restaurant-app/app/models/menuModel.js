const mongoose = require('mongoose')
const menuSchema = mongoose.Schema({
    dishName: [String],
    dishPrice: [Number]
})
module.exports = {
    menuSchema
}