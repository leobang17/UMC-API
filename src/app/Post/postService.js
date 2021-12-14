const postProvider = require('./postProvider');
const postDao = require('./postDao');

const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require("../../../config/response");
const { pool } = require('../../../config/database');

exports.createPost = async ({ userIdx, content, imgUrl }) => {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const createPostRes = await postDao.createPost(connection, { userIdx, content });
        const postIdx = createPostRes.insertId;
        // const postIdx = await postDao.getPostIdx(connection);
        for (let imgUrlIter of imgUrl) {
            await postDao.createImgUrl(connection, { imgUrlIter, postIdx });
        }
        
        connection.release();
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}