const postService = require('./postService');
const postProvider = require('./postProvider');

const baseResponse = require('../../../config/baseResponseStatus');
const { response, errResponse } = require('../../../config/response');

exports.getMainFeeds = async (req, res) => {
    const userInfo = req.user;
}


exports.createPost = async (req, res) => {
    const { userIdx } = req.user;
    const { content, imgUrl, hashtag } = req.body;
    
    if (!content) 
        return res.send(response(baseResponse.POST_CONTENT_EMPTY));
    
    const createPostRes = await postService.createPost({ userIdx, content, imgUrl, hashtag });
    return res.send(createPostRes);
};


exports.getPost = async (req, res) => {
    const postIdx = req.params.id;
    const getPostRes = await postService.getPost({ postIdx });

    return res.send(getPostRes);
}

exports.updatePost = async (req, res) => {
    const { content, imgUrl } = req.body;
    const params = {
        postIdx: req.params.id,
        userIdx: req.user.userIdx,
        content,
        imgUrl,
    };

    const updatePostRes = await postService.updatePost(params);
    return res.send(updatePostRes);
}

exports.deletePost = async (req, res) => {
    const serviceParams = {
        postIdx: req.params.id,
        userIdx: req.user.userIdx
    };
    const deletePostRes = await postService.deletePost(serviceParams);

    return res.send(deletePostRes);
}

exports.createComment = async (req, res) => {
    const serviceParams = {
        postIdx: req.params.id,
        userIdx: req.user.userIdx,
        content: req.body.content,
    };

    const createCommentRes = await postService.createComment(serviceParams);

    return res.send(createCommentRes);
}

exports.deleteComment = async (req, res) => {
    const serviceParams = {
        postIdx: req.params.postId,
        commentIdx: req.params.commentId,
        userIdx: req.user.userIdx,
    };

    const deleteCommentRes = await postService.deleteComment(serviceParams);
    return res.send(deleteCommentRes);

};

exports.updateComment = async (req, res) => {
    const serviceParams = {
        postIdx: req.params.posdId,
        commentIdx: req.params.commentId,
        userIdx: req.user.userIdx,
        content: req.body.content
    };
    
    const updateCommentRes = await postService.updateComment(serviceParams);
    return res.send(updateCommentRes);
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

exports.searchPost = async (req, res) => {
    const keywords = req.query.keyword.split("+");
    
    const searchPostRes = await postService.searchPost({ keywords });

    return res.send(searchPostRes);
}