const multer = require('multer')
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // fazemos assim pois o path identifica qual a barra de cada sistema.
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname) // armazenamos a extensão da imagem
            const name = path.basename(file.originalname, ext) // armazenamos o nome da imagem

            callback(null, `${name}-${Date.now()}${ext}`)
        }
    })
}