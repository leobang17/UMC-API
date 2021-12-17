const { pool } = require('../../../config/database');
const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

const userDao = require('./userDao');
const userProvider = require('./userProvider');

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
}