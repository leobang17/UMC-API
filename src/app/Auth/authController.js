const regexEmail = require('regex-email');

const authProvider = require('./authProvider')
const authService = require('./authService');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');
const { pool } = require('../../../config/database');

exports.authJoin = async (req, res) => {
    const { email, password, nickname, profileImgUrl, introduction } = req.body;
    
    if (!email) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    }

    if (email.length > 30) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    }

    if (!regexEmail.test(email)) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    }

    const joinResponse = await authService.createUser(
        email,
        password,
        nickname,
        profileImgUrl,
        introduction
    )

    return res.send(joinResponse);
}

exports.test = async (req, res) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const results = await connection.query(`
        SELECT email, nickname
        FROM User
        WHERE email = "bluke17@naver.com";
    `);
    connection.release();
    if (results[0]) {
        console.log("없다 이놈아");
    } else {
        console.log("있다 이놈아");
    }
    return res.send(results[0]);
}