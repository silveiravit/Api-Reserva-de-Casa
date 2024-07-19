const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')

class App{

    constructor(){
        this.server = express()

        mongoose.connect('mongodb+srv://devhouse:devhouse@apidevhouse.ef3hro2.mongodb.net/?retryWrites=true&w=majority&appName=ApiDevHouse')

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.server.use(cors())
        // aqui criamos uma rota para a nossa url de imagens
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )

        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes)
    }

}

module.exports = new App().server