const express = require('express');
const { verifyToken } = require('../../middlewares/index');
const { pool } = require('../../../config/database');
const post = require('./postController');

require('dotenv').config();

const router = express.Router();

router.route('/')
    // .get(post.getMainFeeds)
    .get(async (req, res) => {
        const connection = await pool.getConnection(async (conn) => conn);
        const query = `SELECT * FROM Post;`;
        const [getRow] = await connection.query(query);
        connection.release()

        res.send(getRow);
    })
    .post(post.createPost)


router.route('/:id')
    .get()
    .patch()
    .delete()


router.route('/:id/likes')
    .post()
    .delete()


router.route('/:id/bookmarks')
    .post()
    .delete()


router.route('/:id/comment')
    .get()
    .post()


router.route('/:postId/comment/:commentId')
    .delete()
    .patch()


router.get('/search')


router.get('/hashtag/:id')


module.exports = router;