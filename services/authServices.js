const Usuario = require('../models/core/usuario')
const jwt = require('jsonwebtoken')

exports.save = async (usuario) => {
    usuario.lastLogin = Date.now()
    return await usuario.save()
}

exports.findlog = async (req) => {
    return await Usuario.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email']
    })
}
exports.findreg = async (req) => {
    return await Usuario.findByPk(req.user.id)
}
