const postService = require('./postService');
const postProvider = require('./postProvider');

const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

exports.getMainFeeds = async (req, res) => {
    const userInfo = req.user;
}


exports.createPost = async (req, res) => {
    const { userIdx } = req.user;
    const { content, imgUrl } = req.body;
    
    if (!content) 
        return res.send(response(baseResponse.POST_CONTENT_EMPTY));
    console.log(`
        유저 인덱스: ${userIdx},
        유저 값들: ${req.body.imgUrl[0].url}
    `)
    const createPostRes = await postService.createPost({ userIdx, content, imgUrl });
    return res.send(createPostRes);
};


exports.getPost = async (req, res) => {
    const postIdx = req.params.id;
    const getPostRes = await postService.getPost({ postIdx });

    return res.send(getPostRes);
}

exports.createLike = async (req, res) => {
    const postIdx = req.params.id;
    const { userIdx } = req.user;
    const createLikeRes = await postService.createLike({ postIdx, userIdx });

    return res.send(createLikeRes);
}

exports.deleteLike = async (req, res) => {
    const postIdx = req.params.id;
    const { userIdx } = req.user;
    const deleteLikeRes = await postService.deleteLike({ postIdx, userIdx });

    return res.send(deleteLikeRes);
}
