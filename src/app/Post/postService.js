const postProvider = require('./postProvider');
const postDao = require('./postDao');

const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require("../../../config/response");
const { pool } = require('../../../config/database');

exports.createPost = async (params) => {
    const { userIdx, content, imgUrl, hashtag } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const createPostRes = await postDao.createPost(connection, { userIdx, content });
        const postIdx = createPostRes.insertId;
        // const postIdx = await postDao.getLastIdx(connection);
        for (let imgUrlIter of imgUrl) {
            await postDao.createImgUrl(connection, { imgUrlIter, postIdx });
        }
        connection.release();
        for (let hashtagIter of hashtag) {
            const hashtagExists = await postProvider.hashtagCheck({ hashtag: hashtagIter });
            let hashtagIdx;
            if (!hashtagExists) {
                hashtagIdx = await this.createHashtag({ hashtag: hashtagIter });
            } else {
                hashtagIdx = hashtagExists.hashtagIdx;
            }
            await this.createHashtagInter({ hashtagIdx, postIdx });
        };

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
        
        if (!getPostRes) {
            connection.release();
            return errResponse(baseResponse.POST_NOT_EXIST);
        }

        const getPostImgRes = await postDao.getPostImg(connection, { postIdx });
        getPostRes.imgUrls = getPostImgRes;
        connection.release();

        const getHashtagRes = await postProvider.getHashtagByPost({ postIdx });
        getPostRes.hashtags = getHashtagRes;

        return getPostRes;
  } catch (err) {
      console.error(err);
      return errResponse(baseResponse.DB_ERROR);
  }
};

exports.getPostByHashtag = async (params) => {
    const { hashtagIdx } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await postDao.getPostByHashtag(connection, { hashtagIdx });
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
    }
};

exports.searchPost = async (params) => {
    const { keywords } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const searchPostRes = await postDao.searchPost(connection, { keywords });
        connection.release()

        await Promise.all(searchPostRes.map(async (iter) => {
            const imgUrlRes = await postProvider.getImgUrl({ postIdx: iter.postIdx });
            const getHashtagRes = await postProvider.getHashtagByPost({ postIdx: iter.postIdx});
            iter.imgUrls = imgUrlRes;
            iter.hashtags = getHashtagRes;
        }));

        return searchPostRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getMainFeeds = async (params) => {
    const { userIdx } = params;
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const mainFeedRes = await postDao.getMainFeeds(connection, { userIdx });
        connection.release();

        await Promise.all(mainFeedRes.map(async (iter) => {
            const imgUrlRes = await postProvider.getImgUrl({ postIdx: iter.postIdx });
            const getHashtagRes = await postProvider.getHashtagByPost({ postIdx: iter.postIdx});
            iter.imgUrls = imgUrlRes;
            iter.hashtags = getHashtagRes;
        }));

        return mainFeedRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    };
};

exports.updatePost = async (params) => {
    const { userIdx, postIdx, content, imgUrl } = params;
    try {
        const checkPostRes = await this.getPost({ postIdx });
        if (checkPostRes.userIdx !== userIdx) 
            return errResponse(baseResponse.UPDATE_POST_WRONG_USER);

        const connection = await pool.getConnection(async (conn) => conn);
        const updatePostRes = await postDao.updatePost(connection, { postIdx, content });
        const deleteImgUrlRes = await postDao.deleteImgUrl(connection, { postIdx });

        for (let imgUrlIter of imgUrl) {
            await postDao.createImgUrl(connection, { imgUrlIter, postIdx });
        };

        connection.release();
        return updatePostRes, deleteImgUrlRes, response(baseResponse.SUCCESS);
    } catch(err) {
        console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deletePost = async (serviceParams) => {
    const { userIdx, postIdx } = serviceParams;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await postDao.getPost(connection, { postIdx });
        
        if (!getPostRes) {
            connection.release();
            return errResponse(baseResponse.POST_NOT_EXIST);
        }
    
        if (userIdx !== getPostRes.userIdx) {
            connection.release();
            return errResponse(baseResponse.DELETE_POST_WRONG_USER);
        };

        // 삭제하는 post가 소유한 hashtag가 마지막 남은 hashtag인지 확인하고, 맞다면 table에서 지워준다. 
        const hashtagCountRes = await postProvider.getHashtagCount({ postIdx });
        Promise.all(hashtagCountRes.map(async (iter) => {
            if (iter.count === 1) {
                await this.deleteHashtag({ hashtagIdx: iter.hashtagIdx });
            };
        }));
        
        const deletePostRes = await postDao.deletePost(connection, { userIdx, postIdx });
        connection.release();

        return deletePostRes, response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createComment = async (params) => {
    const { postIdx, userIdx, content } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const getPostRes = await postDao.getPost(connection, { postIdx });
        
        if (!getPostRes) {
            connection.release();
            return errResponse(baseResponse.POST_NOT_EXIST);
        };

        const createCommentRes = await postDao.createComment(connection, { postIdx, userIdx, content });
        connection.release();
        
        return createCommentRes, response(baseResponse.SUCCESS);
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    };
}

exports.deleteComment = async (params) => {
    const { commentIdx, userIdx } = params;
    try {
        const commentExist = await postProvider.commentCheck({ commentIdx });
        if (!commentExist) {
            return errResponse(baseResponse.COMMENT_NOT_EXIST);
        };
        if (commentExist.userIdx !== userIdx) {
            return errResponse(baseResponse.DELETE_COMMENT_WRONG_USER);
        };

        const connection = await pool.getConnection();
        const deleteCommentRes = await postDao.deleteComment(connection, { commentIdx });
        connection.release();
        return deleteCommentRes, response(baseResponse.SUCCESS);
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    };
}

exports.updateComment = async (params) => {
    const { userIdx, postIdx, commentIdx, content } = params;
    try {
        const commentExist = await postProvider.commentCheck({ commentIdx });
        if (!commentExist) {
            return errResponse(baseResponse.COMMENT_NOT_EXIST);
        };
        if (commentExist.userIdx !== userIdx) {
            return errResponse(baseResponse.DELETE_COMMENT_WRONG_USER);
        };

        const connection = await pool.getConnection();
        const updateCommentRes = await postDao.updateComment(connection, { commentIdx, content });
        connection.release();

        return updateCommentRes, response(baseResponse.SUCCESS);
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createHashtag = async (params) => {
    const { hashtag } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const createHashtagRes = await postDao.createHashtag(connection, { hashtag });

        connection.release();

        return createHashtagRes.insertId;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteHashtag = async (params) => {
    const { hashtagIdx } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteHashtagRes = await postDao.deleteHashtag(connection, { hashtagIdx });
        connection.release();

        return deleteHashtagRes;
    } catch(err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createHashtagInter = async (params) => {
    const { hashtagIdx, postIdx } = params;
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        await postDao.createHashtagInter(connection, { hashtagIdx, postIdx });
        connection.release();
    } catch (err) {
        console.error(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

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