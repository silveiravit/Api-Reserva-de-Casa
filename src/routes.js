const { Router } = require('express')
const SessionController = require('./Controller/SessionController')
const HouseController = require('./Controller/HouseController')
const DashboardController = require('./Controller/DashboardController')
const ReserveController = require('./Controller/ReserveController')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const auth = require('./middleware/auth')

const routes = new Router()
const upload = multer(uploadConfig)

// get
routes.get('/index', HouseController.index)
routes.get('/dashboard', DashboardController.show)
routes.get('/reserves', ReserveController.index)
routes.get('/users', SessionController.index)

// post
routes.post('/sessions', SessionController.store)
routes.post('/houses', auth, upload.single('thumbnail'), HouseController.store)
routes.post('/houses/:house_id/reserve', auth, ReserveController.store)

// put
routes.put('/update/:house_id', auth, upload.single('thumbnail'), HouseController.update)

// delete
routes.delete('/delete', auth, HouseController.destroy)
routes.delete('/reserves/cancel', auth, ReserveController.destroy)

module.exports = routes