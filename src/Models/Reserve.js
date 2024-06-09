const mongoose = require('mongoose')

const ReserveModel = new mongoose.Schema({
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    }
})

module.exports = mongoose.model('Reserve', ReserveModel)