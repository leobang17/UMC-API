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
        // const postIdx = await postDao.getLastIdx(connection);
        for (let imgUrlIter of imgUrl) {
            await postDao.createImgUrl(connection, { imgUrlIter, postIdx });
        }
        
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.getPost = async ({ postIdx }) => {
  try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await postDao.getPost(connection, { postIdx });
        const getPostImgRes = await postDao.getPostImg(connection, { postIdx });
        getPostRes.imgUrl = getPostImgRes;
        console.log(getPostRes);
        connection.release();
        return getPostRes;
  } catch (err) {
      console.error(err);
      return errResponse(baseResponse.DB_ERROR);
  }
};


exports.createLike = async (params) => {
    const { postIdx, userIdx } = params;

    try {
        const likeExists = await postProvider.likeCheck({ postIdx, userIdx });
        console.log(likeExists);
        if (likeExists.length > 0)
            return errResponse(baseResponse.LIKE_ALREADY_EXISTS);

        const connection = await pool.getConnection(async (conn) => conn);
        const createLikeRes = await postDao.createLike(connection, { postIdx, userIdx });
        connection.release();
        return createLikeRes, response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteLike = async (params) => {
    const { postIdx, userIdx } = params;
    
    try {
        const likeExists = await postProvider.likeCheck(params);
        if (likeExists.length < 1)
            return errResponse(baseResponse.LIKE_EMPTY);

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteLikeRes = await postDao.deleteLike(connection, { postIdx, userIdx });
        connection.release();

        return deleteLikeRes, response(baseResponse.SUCCESS);
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}