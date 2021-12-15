const jwt = require('jsonwebtoken');
const baseResponse = require('../../config/baseResponseStatus');
const { response, errResponse } = require('../../config/response');
require('dotenv').config();

// passport를 이용하지는 않았지만, req.user에 유저 정보를 전달하는 middleware (passport의 deserializeUser 같이)가 필요한 것 같아 만듦.
// jwt를 해독한 다음, 해당 값을 req.user에 전달.
const saveUserInfo = async (req, res, next) => {
    const token = req.headers.x_access_token || req.query.token;
    
    if (!token) {
        console.log("토큰이 없네")
        return next();
    } 
    try {
        const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenDecoded);
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