const express = require('express');
require('dotenv').config();

const router = express.Router();

router.route('/')
    .get()
    .post()

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