const express = require('express');
const { pool } = require('../../../config/database');
const auth = require('./authController');

const router = express.Router();

router.get('/', async (req, res) => {




    const connection = await pool.getConnection(async (conn) => conn);
    // console.log(connection);
    const query = `
        SELECT * FROM user;
    `
    const userList = await connection.query(query);
    connection.release();
    res.send(userList[0]);
})

router.post('/join', auth.authJoin);

router.get('/test', auth.test);


module.exports = router;