const { pool } = require('../../../config/database');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

const userDao = require('./userDao');

exports.checkFollow = async (params) => {
    const { myIdx, followingIdx } = params;

    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const checkFollowRes = await userDao.checkFollow(connection, { myIdx, followingIdx });
        connection.release();

        return checkFollowRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.checkUser = async (params) => {
    const { userIdx } = params;
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const checkUserRes = await userDao.checkUser(connection, { userIdx });
        connection.release();

        return checkUserRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}