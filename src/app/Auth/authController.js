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

exports.authLogin = async (req, res) => {
    const { email, password } = req.body;
    const loginResponse = await authService.login(email, password);
    return res.send(loginResponse);
}

exports.authLogout = async (req, res) => {
    // jwt 삭제는 FE에서 ? Sessoin에 저장하는지 어떻게 할 것인지 모르겠어서 우선 Logic은 생략.
    // 일단은 verifyToken middleware를 통과하여 Success를 반환하면 FE에서 알아서 처리하는 것으로. 

    // passport를 이용하지 않서 req.user 객체가 없음 -> id값을 path variable로 받아야 하는지 ?
    // 추후에 passport module 적용해서 login, logout 다시 짤 것.
    return res.send(response(baseResponse.SUCCESS));
}

exports.test = async (req, res) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const [results] = await connection.query(`
        SELECT email, nickname, password
        FROM User아
        WHERE email = "bluke17@naver.com";
    `);
    connection.release();
    // if (results[0]) {
    //     console.log("없다 이놈아");
    // } else {
    //     console.log("있다 이놈아");
    // }
    return res.send(results);
}

exports.jwtTest = async (req, res) => {
    console.log(req.decoded);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
}