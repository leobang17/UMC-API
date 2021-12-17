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

exports.getImgUrl = async (params) => {
    const { postIdx } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getImgUrlRes = await postDao.getImgUrl(connection, { postIdx });
        connection.release();

        return getImgUrlRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.hashtagCheck = async (params) => {
    const { hashtag } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const hashtagCheckRes = await postDao.hashtagCheck(connection, { hashtag });
        connection.release();

        return hashtagCheckRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getHashtagByPost = async (params) => {
    const { postIdx } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getHashtagByPostRes = await postDao.getHashtagByPost(connection, { postIdx });
        connection.release();

        return getHashtagByPostRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}