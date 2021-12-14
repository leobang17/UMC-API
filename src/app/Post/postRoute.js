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


router.route('/:id/')


module.exports = router;