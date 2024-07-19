const mongoose = require('mongoose')

const HouseSchema = new mongoose.Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { // aqui é para colocar a variável virtual assim que fizermos a requisição
    toJSON: {
        virtuals: true
    }
})

HouseSchema.virtual('thumbnail_url').get(function (){ 
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('House', HouseSchema)