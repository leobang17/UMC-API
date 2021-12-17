const express = require('express');
const { verifyToken } = require('../../middlewares/index');
const { pool } = require('../../../config/database');
const post = require('./postController');

require('dotenv').config();

const router = express.Router();

router.get('/test', async (req, res) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const query = `SELECT * FROM Post;`;
    const [getRow] = await connection.query(query);
    connection.release()

    res.send(getRow);
});

router.route('/')
    // .get(post.getMainFeeds)
    .post(post.createPost)


router.get('/search', post.searchPost);

router.route('/:id')
    .get(post.getPost)
    .patch(post.updatePost)
    .delete(post.deletePost)


router.route('/:id/postlike')
    .post(post.createLikeOrBookmark)
    .delete(post.deleteLikeOrBookmark)


router.route('/:id/bookmark')
    .post(post.createLikeOrBookmark)
    .delete(post.deleteLikeOrBookmark)


router.route('/:id/comment')
    .get()
    .post(post.createComment)


router.route('/:postId/comment/:commentId')
    .delete(post.deleteComment)
    .patch(post.updateComment)


router.get('/hashtag/:id', post.getPostByHashtag);




module.exports = router;