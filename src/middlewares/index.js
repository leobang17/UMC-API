const jwt = require('jsonwebtoken');

const baseResponse = require('../../config/baseResponseStatus');
const { response, errResponse} = require('../../config/response');

require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.x_access_token || req.query.token;
    
    // jwt가 없을 경우 
    if (!token)
        return res.send(errResponse(baseResponse.TOKEN_EMPTY))

    try {
        req.decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.send(errResponse(baseResponse.TOKEN_EXPIRED));
        };

        return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }   
};