const jwt = require('jsonwebtoken')
const validationServices = require("../services/validationServices")
require('dotenv').config();

module.exports = (req, res, next) => {
  let decodedToken
   try {
        const authHeader = req.get('Authorization')

        validationServices.tokenAuthHeader(authHeader) 

        const token = req.get('Authorization').split(' ')[1]

        decodedToken = jwt.verify(token,process.env.TOKEN_KEY) 

        validationServices.validDecodedtoken(decodedToken)
    } catch (error) {
        return next(error)
    }
    req.userId = decodedToken.id
    req.userName = decodedToken.username
    next()
}