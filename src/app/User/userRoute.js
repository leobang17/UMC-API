const express = require('express');
const user = require('./userController');

require('dotenv').config();

const router = express.Router();

router.route('/follow/:id')
    .post(user.createFollow)
    .delete(user.deleteFollow);

router.get('/:id');

router.get('/:id/posts', user.getPostByUser);
router.get('/:id/likes', user.getPostByLikeOrBookmark);
router.get('/:id/bookmarks', user.getPostByLikeOrBookmark)
router.get('/:id/following', user.getUserByFollow)
router.get('/:id/followers', user.getUserByFollow)


module.exports = router;