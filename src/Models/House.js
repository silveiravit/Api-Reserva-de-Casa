const mongoose = require('mongoose')

const HouseModel = new mongoose.Schema({
    image: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('House', HouseModel)