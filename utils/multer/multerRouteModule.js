const multer = require('multer')
const { fileFilter, fileStorage } = require('./files')

exports.upload = multer({
    storage: fileStorage, 
    fileFilter: fileFilter})
    .single('imagen')