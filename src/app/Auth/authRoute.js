const express = require('express');
const { pool } = require('../../../config/database');
const auth = require('./authController');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.get('/', async (req, res) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const query = `
        SELECT * FROM user;
    `
    const [userList] = await connection.query(query);
    connection.release();
    res.send(userList);
})

router.post('/join', auth.authJoin);

router.post('/login', auth.authLogin);

router.get('/logout', verifyToken, auth.authLogout);

router.get('/test', auth.test);

router.get('/jwt-test', verifyToken, auth.jwtTest);


module.exports = router;