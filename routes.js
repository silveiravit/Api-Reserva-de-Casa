const { Router } = require('express')
const HouseController = require('./src/Controller/HouseController')
const DashboardController = require('./src/Controller/DashboardController')
const ReserveController = require('./src/Controller/ReserveController')
const SessionController = require('./src/Controller/SessionController')
const uploadConfig = require('./src/config/upload')
const multer = require('multer')

const routes = new Router()
const upload = multer(uploadConfig)

// get
routes.get('/index', HouseController.index)
routes.get('/users', SessionController.index)
routes.get('/reserves', ReserveController.index)
routes.get('/dashboard', DashboardController.show)

// post
routes.post('/houses', upload.single('image'), HouseController.store)
routes.post('/user', SessionController.store)
routes.post('/reserve/:house_id', ReserveController.store)

// put
routes.put('/update/:house_id', HouseController.update)

// delete
routes.delete('/deletehouse', HouseController.destroy)
routes.delete('/deletereserve', ReserveController.destroy)

module.exports = routes