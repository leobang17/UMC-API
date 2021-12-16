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

exports.commentCheck = async (params) => {
    const { commentIdx } = params;
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const commentCheckRes = await postDao.commentCheck(connection, { commentIdx });
        connection.release();
        return commentCheckRes;
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}