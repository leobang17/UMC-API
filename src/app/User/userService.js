const { pool } = require('../../../config/database');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

const userDao = require('./userDao');
const userProvider = require('./userProvider');
const postProvider = require('../Post/postProvider');

exports.createFollow = async (params) => {
    const { myIdx, followingIdx } = params;
    
    try {
        const checkFollow = await userProvider.checkFollow({ myIdx, followingIdx });
        if (checkFollow)
            return errResponse(baseResponse.USER_ALREADY_FOLLOWING);
        
        const connection = await pool.getConnection(async (conn) => conn);
        const createFollowRes = await userDao.createFollow(connection, { myIdx, followingIdx });
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteFollow = async (params) => {
    const { myIdx, followingIdx } = params;
    
    try {
        const checkFollow = await userProvider.checkFollow({ myIdx, followingIdx });
        if (!checkFollow)
            return errResponse(baseResponse.USER_ALREADY_UNFOLLOWING);
        
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteFollowRes = await userDao.deleteFollow(connection, { myIdx, followingIdx });
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getPostByUser = async (params) => {
    const { userIdx } = params;
    try {
        const userExist = await userProvider.checkUser({ userIdx });
        if (!userExist)
            return errResponse(baseResponse.USER_NOT_EXIST);

        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await userDao.getPostByUser(connection, { userIdx });
        connection.release();

        await Promise.all(getPostRes.map(async (iter) => {
            const imgUrlRes = await postProvider.getImgUrl({ postIdx: iter.postIdx });
            const getHashtagRes = await postProvider.getHashtagByPost({ postIdx: iter.postIdx});
            iter.imgUrls = imgUrlRes;
            iter.hashtags = getHashtagRes;
        }));       

        return getPostRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    };
};

exports.getPostByLikeOrBookmark = async (params) => {
    const { userIdx, type } = params;
    try {
        const userExist = await userProvider.checkUser({ userIdx });
        if (!userExist)
            return errResponse(baseResponse.USER_NOT_EXIST);

        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await userDao.getPostByLikeOrBookmark(connection, { userIdx, type });
        connection.release();

        await Promise.all(getPostRes.map(async (iter) => {
            const imgUrlRes = await postProvider.getImgUrl({ postIdx: iter.postIdx });
            const getHashtagRes = await postProvider.getHashtagByPost({ postIdx: iter.postIdx});
            iter.imgUrls = imgUrlRes;
            iter.hashtags = getHashtagRes;
        }));       

        return getPostRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    };
};

exports.getUserByFollow = async (params) => {
    const { userIdx, whereCondition, selectCondition } = params;

    try {
        const userExist = await userProvider.checkUser({ userIdx });
        if (!userExist)
            return errResponse(baseResponse.USER_NOT_EXIST);

        const connection = await pool.getConnection(async (conn) => conn);
        const getUserRes = await userDao.getUserByFollow(connection, { userIdx, whereCondition, selectCondition });
        connection.release();

        return getUserRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}