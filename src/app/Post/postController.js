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
    
    // userIdx를 받아서, create
    // userIdx -> body에 담긴 데이터를 받아서 확인하고, 

    return res.send(createPostRes);
};


exports.getPost = async (req, res) => {
    const postIdx = req.params.id;
    const getPostRes = await postService.getPost({ postIdx });

    return res.send(getPostRes);
}