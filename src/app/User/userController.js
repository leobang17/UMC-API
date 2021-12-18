const baseResponse = require('../../../config/baseResponseStatus');
const { errResponse } = require('../../../config/response');
const userService = require('./userService');

exports.createFollow = async (req, res) => {
    const params = {
        myIdx: req.user.userIdx,
        followingIdx: parseInt(req.params.id),
    }
    console.log(params);
    if (params.myIdx === params.followingIdx) 
        return res.send(errResponse(baseResponse.USER_IS_SELF));
    
    const createFollowRes = await userService.createFollow(params);

    return res.send(createFollowRes);
};

exports.deleteFollow = async (req, res) => {
    const params = {
        myIdx: req.user.userIdx,
        followingIdx: parseInt(req.params.id),
    };

    if (params.myIdx === params.followingIdx) 
        return res.send(errResponse(baseResponse.USER_IS_SELF));
    
    const deleteFollowRes = await userService.deleteFollow(params);

    return res.send(deleteFollowRes);
}

exports.getPostByUser = async (req, res) => {
    const userIdx = req.params.id;
    const getPostRes = await userService.getPostByUser({ userIdx });

    return res.send(getPostRes);
};

exports.getPostByLikeOrBookmark = async (req, res) => {
    const params = {
        userIdx: req.params.id
    };

    const path = req.route.path.split('/');

    if (path[path.length - 1] === "likes") {
        params.type = "PostLike"; 
    } else if (path[path.length - 1] === "bookmarks") {
        params.type = "Bookmark";
    };

    const getPostRes = await userService.getPostByLikeOrBookmark(params);

    return res.send(getPostRes);
};

exports.getUserByFollow = async (req, res) => {
    const params = {
        userIdx: req.params.id,
    };
    const path = req.route.path.split('/');

    if (path[path.length - 1] === "followers") {
        params.whereCondition = "followingIdx";
        params.selectCondition = "followerIdx";
    } else if (path[path.length - 1] === "following") {
        params.whereCondition = "followerIdx";
        params.selectCondition = "followingIdx";
    };

    const getPostRes = await userService.getUserByFollow(params);
    
    return res.send(getPostRes);
};

exports.getProfile = async (req, res) => {
    const userIdx = req.params.id;
    const userRes = await userService.getProfile({ userIdx });
    return res.send(userRes);
}