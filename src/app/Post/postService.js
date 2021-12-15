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


exports.createLikeOrBookmark = async (params) => {
    const { postIdx, userIdx, targetTable } = params;

    try {
        const doExist = await postProvider.likeOrBookmarkCheck({ postIdx, userIdx, targetTable });
        console.log(doExist);
        if (doExist.length > 0){
            if (targetTable === "postlike")
                return errResponse(baseResponse.LIKE_ALREADY_EXISTS);
            if (targetTable === "bookmark")
                return errResponse(baseResponse.BOOKMARK_ALREADY_EXISTS);
        }

        const connection = await pool.getConnection(async (conn) => conn);
        const createLikeRes = await postDao.createLikeOrBookmark(connection, { postIdx, userIdx, targetTable });
        connection.release();

        return createLikeRes, response(baseResponse.SUCCESS);

    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteLikeOrBookmark = async (params) => {
    const { postIdx, userIdx, targetTable } = params;
    
    try {
        const doExist = await postProvider.likeOrBookmarkCheck(params);
        if (doExist.length < 1) {
            if (targetTable === "postlike") 
                return errResponse(baseResponse.LIKE_EMPTY);
            if (targetTable === "bookmark")
                return errResponse(baseResponse.BOOKMARK_EMPTY);
        }

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteLikeRes = await postDao.deleteLikeOrBookmark(connection, { postIdx, userIdx, targetTable });
        connection.release();

        return deleteLikeRes, response(baseResponse.SUCCESS);
        
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}