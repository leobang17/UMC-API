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