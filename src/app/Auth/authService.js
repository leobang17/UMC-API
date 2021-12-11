const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const { pool } = require('../../../config/database');

const authProvider = require('./authProvider');
const authDao = require('./authDao');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

exports.createUser = async (email, password, nickname, profileImgUrl, introduction) => {
    try {
        // 중복된 email 검사.
        const emailExists = await authProvider.emailCheck(email);
        if (emailExists.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        
        const hash = await bcrypt.hash(password, 12);
        
        const userParams = { email, hash, nickname, profileImgUrl, introduction };
        
        const connection = await pool.getConnection(async (conn) => conn);

        const createUserResult = await authDao.createUser(connection, userParams);
        
        console.log(`추가된 회원: ${createUserResult}`);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.login = async (email, password) => {
    if (!email) return errResponse(baseResponse.SIGNUP_EMAIL_EMPTY);
    if (!password) return errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY);

    try {
        const emailExists = await authProvider.emailCheck(email);
        if (emailExists.length < 1) 
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
            
            const result = await bcrypt.compare(password, emailExists[0].password);
            if (result) {
                // token 생성 
                const tokenPayload = { userIdx: emailExists[0].userIdx };
                const tokenConfig = {
                    expiresIn: "365d",
                    subject: "userInfo"
                };
                const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenConfig);
                
                return response(baseResponse.SUCCESS, { "userId": emailExists[0].userIdx, 'jwt': token });
            } else {
                return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
            }

    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}