const { body, validationResult} = require('express-validator')
const passport = require('passport')
const Usuario = require('../models/core/usuario')
const fs = require('fs')

exports.loginValidationRules = () => {
  return [
    body('username')
            .exists()
            .withMessage("no existe el campo username")
            .isString()
            .isLength({min: 4})
            .escape()
            .withMessage('Por favor ingresa un nombre de usuario válido.'),
        body('password')
        .exists()
            .withMessage("no existe el campo password")
            .trim()
            .isLength({min: 1})
            .escape()
            .withMessage('La clave no puede estar vacía.')
  ]
}
exports.registerValidationRules = () => {
    return [
        body('email')
        .exists()
        .withMessage("no existe el campo email")
        .isEmail()
        .withMessage('Por favor ingresa un email válido.')
        .normalizeEmail(),
        body('username')
        .exists()
        .withMessage("no existe el campo username")
        .isString()
        .isLength({min: 4})
        .escape()
        .bail()
        .withMessage('Por favor ingresa un nombre de usuario válido,')
        .custom((value, { req }) => {
           return Usuario.findOne({ where: { username: value}})
            .then (usuario => {
                if (usuario) {
                    return Promise.reject('El nombre de usuario ya existe.')
                }
            })
        }),
    body('password')
        .exists()
        .withMessage("no existe el campo password")
        .trim()
        .isLength({min: 10})
        .withMessage('La clave debe tener al menos 10 caracteres.'),
    body('confirmarPassword')
        .exists()
        .withMessage("no existe el campo confirmarPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las claves no coinciden.')
            }
            else {
                return true
            }
        })
    ]
  }
  exports.pubValidationRules = () => {
    return [
      body('titulo')
      .exists()
      .withMessage("no existe el campo titulo")
      .trim().isLength({ min: 5 }).escape()
      .withMessage('El titulo debe tener al menos 5 caracteres.'),
      body('contenido')
      .exists()
      .withMessage("no existe el campo contenido")
      .trim().isLength({ min: 5 }).escape()
      .withMessage('El contenido debe tener al menos 5 caracteres.')
     ]
  }
exports.loginValidate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const error = new Error('Datos inválidos.')
        error.statusCode = 422
        error.data = errors.array()
        next(error)
    }
    else{
        passport.authenticate('local.signin', (err, user, info) => {
        
        if (err) return next(err)
  
        if (!user) {
          res.status('401').send({ mensaje: info.mensaje })
        }
        else
        {
          req.user = user
          next()
        }
  
      })(req, res, next)

    }

  }
  exports.registerValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Datos inválidos.')
        error.statusCode = 422
        error.data = errors.array()
        console.log(error)
    return next(error)
    }
    next()
  }
  exports.pubValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if(typeof req.file !== "undefined"){
        fs.unlink(req.file.path, err => {
          if (err) console.log(err)
      })}
      const error = new Error('Datos inválidos.')
      error.statusCode = 422
      error.data = errors.array()
     return next(error)
    }
    next()
  }
  /*exports.passportAuthenticate = () => {
     passport.authenticate('local.signup', {
        /*successRedirect: '/usuarios/profile',*/
        /*failureRedirect: '/usuarios/signup',*/
      //  failureFlash: true
    //})
   //}