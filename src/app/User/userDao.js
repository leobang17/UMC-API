
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
}

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
