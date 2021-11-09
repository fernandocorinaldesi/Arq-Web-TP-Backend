const authService= require('../../services/authServices')
const tokenService= require('../../services/tokenServices')
require('dotenv').config()


exports.signup = async (req, res, next) => {
    try {
        const usuario = await authService.findreg(req)
        const resultado =await authService.save(usuario)
        console.log(resultado)
        res.status(201).json({
            mensaje: 'Usuario creado correctamente.',
            urlNext: '/'
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const usuario= await authService.findlog(req)
        const resultado =await authService.save(usuario)
        const token= tokenService.generateToken(resultado)
        const refreshToken = tokenService.generateRefreshToken(resultado)
        //tokenService.addRefreshTokenToRedis(refreshToken,resultado.username,token,process.env.REFRESH_TOKEN_EXP)
        res.status(200).json({
            usuario: resultado,
            mensaje: 'Datos válidos.',
            token: token,
            refreshToken:refreshToken,
        })
    } catch (error) {
        next(error) 
    }
}
