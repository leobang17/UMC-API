
exports.createFollow = async (connection, params) => {
    const { myIdx, followingIdx } = params;
    const query = `
        INSERT INTO Follow 
        (followerIdx, followingIdx)
        VALUES 
        ("${myIdx}", "${followingIdx}");
    `;

    const [followRows] = await connection.query(query);
    return followRows;
};

exports.deleteFollow = async (connection, params) => {
    const { myIdx, followingIdx } = params;
    const query = `
        DELETE FROM Follow
        WHERE followerIdx = "${myIdx}" and followingIdx = "${followingIdx}";
    `;

    const [followRows] = await connection.query(query);
    return followRows;
};

exports.getPostByUser = async (connection, params) => {
    const { userIdx } = params;
    const query = `
        SELECT p.postIdx, u.userIdx, u.nickname, p.content, p.createdAt
        FROM Post p
        JOIN User u 
        ON p.userIdx = u.userIdx
        WHERE u.userIdx = "${userIdx}"
        ORDER BY p.createdAt DESC;
    `;

    const [postRows] = await connection.query(query);
    return postRows;
};

exports.checkFollow = async (connection, params) => {
    const { myIdx, followingIdx } = params;
    const query = `
        SELECT followerIdx, followingIdx
        FROM Follow
        WHERE followerIdx = "${myIdx}" and followingIdx = "${followingIdx}";
    `;

    const [[followRows]] = await connection.query(query);
    return followRows;
};

exports.checkUser = async (connection, params) => {
    const { userIdx } = params;
    const query = `
        SELECT userIdx
        FROM User
        WHERE userIdx = "${userIdx}";
    `;

    const [[userRows]] = await connection.query(query);
    return userRows;
};