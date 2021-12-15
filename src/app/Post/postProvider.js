const baseResponse = require('../../../config/baseResponseStatus');
const { pool } = require('../../../config/database');
const { errResponse } = require('../../../config/response');
const postDao = require('./postDao');

exports.likeOrBookmarkCheck = async (params) => {
    const { userIdx, postIdx, targetTable } = params;
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const checkRes = await postDao.likeOrBookmarkCheck(connection, { userIdx, postIdx, targetTable });
        connection.release();
        return checkRes;
    } catch(err) {
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    }
}

