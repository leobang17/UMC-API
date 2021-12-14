const jwt = require('jsonwebtoken');
const baseResponse = require('../../config/baseResponseStatus');
const { response, errResponse } = require('../../config/response');
require('dotenv').config();


const saveUserInfo = async (req, res, next) => {
    const token = req.headers.x_access_token || req.query.token;
    
    if (!token) {
        console.log("토큰이 없네")
        return next();
    } 
    try {
        const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecoded;

        return next();
    } catch (err) {
        console.log(err);
        if (err.name === 'TokenExpiredError') {
            return res.send(errResponse(baseResponse.TOKEN_EXPIRED));
        };

        return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }
        
}


module.exports = saveUserInfo;