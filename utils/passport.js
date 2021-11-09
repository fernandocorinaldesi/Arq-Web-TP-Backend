const passport = require('passport')
const Usuario = require('../models/core/usuario')
const LocalStrategy = require('passport-local').Strategy

const { validationResult } = require('express-validator')

/**
 *  Passport usa done(null,usuario.id) en serializeUser 
 *  para tomar el id del usuario y almacenarlo internamente
 *  en req.session.passport para seguir las cuestiones de la sesión.
 */
passport.serializeUser(function (usuario, done) {
    return done(null, usuario.id)
})

passport.deserializeUser(function (id, done) {
    Usuario.findByPk(id).then(function(user) {
        if (user) {
            return done(null, user.get());
        } else {
            return done(user.errors, null);
        }
    })
    .catch(error => {
        console.log(error)
    })
})

passport.use('local.signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        
        // Validación del formulario hecha en el middleware
        const email = req.body.email

        // Procesamiento del formulario

        Usuario.findOne({ where: { username : username } })
        .then(usuario => {

            if (usuario) {
                return done(null, false, { message: 'El usuario ya está en uso.' })
            }

            const nuevoUsuario = Usuario.build({
                username: username,
                email: email,
                rol: "usuario",
                password: Usuario.encryptPassword(password)
            })

            nuevoUsuario.save()
            .then(resultado => {
                console.log(resultado)
                return done(null, nuevoUsuario)
            })
            .catch(error => {
                return done(error)
            })
        })
    })
)

passport.use('local.signin', 
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        
        // Validación del formulario hecha en el middleware
        const email = req.body.email

        Usuario.findOne( { where: { username : username } })
        .then(usuario => {
            if (!usuario) {
                return done(null, false, { mensaje: 'Datos de acceso no válidos, verificá tu usuario y clave.' })
            }
            
            if (!Usuario.validPassword(usuario, password)) {
                return done(null, false, { mensaje: 'Datos de acceso no válidos, verificá tu usuario y clave.' })
            }

            return done(null, usuario)
        })
        .catch(error => {
            return done(error)
        })
    }
))
