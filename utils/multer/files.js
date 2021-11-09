const multer = require('multer')
const fs = require('fs')
const path = require('path')
const urlValidator = require('./urlValidator')

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        urlValidator.checkFronturl(req.baseUrl)
        if(urlValidator.isValid()){
         cb(null,'images'+urlValidator.assignDestinationFolder())
        }
        else
        {
         cb(urlValidator.getError())           
        }
    },
    filename: (req, file, cb) => {
        //cb(null, new Date().toISOString() + '-' + file.originalname)//en linux
        cb(null, new Date().getTime() + '-' + file.originalname)//en windows
    }
})
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const eliminarImagen = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => {
        if (err) console.log(err)
    })
}

module.exports.fileStorage = fileStorage
module.exports.fileFilter = fileFilter
module.exports.eliminarImagen = eliminarImagen