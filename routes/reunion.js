const express = require('express')
const router = express.Router()
const reunionController = require('../controllers/reunionController')

// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    reunionController.getAll
)

router.get('/:id',
    // tokenAuth,
    reunionController.findById
),

router.post('/',
    //tokenAuth,
   // multer.upload,
   // validator.pubValidationRules(),
    //validator.pubValidate,
    reunionController.addReunion
)

router.delete('/:id',
   // tokenAuth,
   reunionController.delete
)

router.put(
    '/:id',
    reunionController.editReunion
  //  tokenAuth,
 //   multer.upload,
 //   validator.pubValidationRules(),
   // validator.pubValidate,publicacionesController.editar
)

module.exports = router