const { pool } = require('../../../config/database');

const authDao = require('./authDao');

exports.emailCheck = async (email) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await authDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
}