const mongoose = require('mongoose')

const ReserveSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Reserve', ReserveSchema)