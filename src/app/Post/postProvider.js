const baseResponse = require('../../../config/baseResponseStatus');
const { pool } = require('../../../config/database');
const { errResponse } = require('../../../config/response');
const postDao = require('./postDao');

exports.likeCheck = async (params) => {
    const { userIdx, postIdx } = params;
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const likeCheckRes = await postDao.likeCheck(connection, { userIdx, postIdx });
        connection.release();
        return likeCheckRes;
    } catch(err) {
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    }
}

