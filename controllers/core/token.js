const jwt = require('jsonwebtoken');
const validationServices = require("../../services/validationServices")
const tokenServices = require("../../services/tokenServices")
require('dotenv').config();

exports.getRefresh = async (req, res, next) => {

  try {
     
    const authHeader = req.get('Authorization')

    validationServices.tokenAuthHeader(authHeader) 

    const refreshtoken = req.get('Authorization').split(' ')[1]
    
    const decodedToken = jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_KEY)

    validationServices.validDecodedtoken(decodedToken)

    //await validationServices.isRefreshtokenInRedis(refreshtoken)

    const token = tokenServices.generateToken(decodedToken)

    res.status(200).json({
      mensaje: 'Datos válidos.',
      token: token,
    })

  } catch (error) {
    next(error);
  }
};

/*exports.rejectToken = async (req, res, next) => {

    try {
       
      const refreshtoken = req.get('Authorization').split(' ')[1]
  
      await validationServices.isRefreshtokenInRedis(refreshtoken)
        
      tokenServices.removeRefreshTokenfromRedis(refreshtoken)
      
      res.status(200).json({
        mensaje: 'El refresh token fue eliminado de redis.',
        refreshTokenEliminado: refreshtoken,
      })
  
    } catch (error) {
      next(error);
    }
  };*/