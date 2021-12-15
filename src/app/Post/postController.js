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

exports.createLikeOrBookmark = async (req, res) => {
    const postIdx = req.params.id;
    const { userIdx } = req.user;
    // route가 bookmarks인지, likes인지 
    const pathSplitted = req.route.path.split('/');
    const targetTable = pathSplitted[pathSplitted.length - 1];
    const createLikeRes = await postService.createLikeOrBookmark({ postIdx, userIdx, targetTable });

    return res.send(createLikeRes);
};

exports.deleteLikeOrBookmark = async (req, res) => {
    const postIdx = req.params.id;
    const { userIdx } = req.user;
    // route가 bookmark인지, likes 인지
    const pathSplitted = req.route.path.split('/');
    const targetTable = pathSplitted[pathSplitted.length - 1];
    const deleteLikeRes = await postService.deleteLikeOrBookmark({ postIdx, userIdx, targetTable });

    return res.send(deleteLikeRes);
};