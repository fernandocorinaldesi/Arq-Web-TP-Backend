const jwt = require('jsonwebtoken')
const client = require('../database/redisConnection')
require('dotenv').config()

exports.generateToken = (usuario) => {
    const token = jwt.sign({
        email: usuario.email,
        username: usuario.username,
        id: usuario.id
    },process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXP
    })
    return token
}

exports.generateRefreshToken = (usuario) => {
    const refreshToken = jwt.sign({
        email: usuario.email,
        username: usuario.username,
        id: usuario.id
    },process.env.REFRESH_TOKEN_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXP
    })
    return refreshToken
}

/*exports.addRefreshTokenToRedis = (refreshToken,username,accessToken,exp)=> {
    client.HMSET(refreshToken,{'username': username,'accessToken' : accessToken
    }, (err) => {
        if(err) {
          console.error(err)
        }
    });

    client.expire(refreshToken, exp);
 }
 
 exports.removeRefreshTokenfromRedis = (refreshToken) => {
    client.del(refreshToken,(err) => {
     if(err) {
        console.error(err)
        }
    });
 }*/