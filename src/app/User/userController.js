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