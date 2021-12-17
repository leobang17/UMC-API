const express = require('express');
const user = require('./userController');

require('dotenv').config();

const router = express.Router();

router.route('/follow/:id')
    .post(user.createFollow)
    .delete(user.deleteFollow);

router.get('/:id');

router.get('/:id/posts')
router.get('/:id/likes')
router.get('/:id/bookmarks')
router.get('/:id/following')
router.get('/:id/followers')


module.exports = router;