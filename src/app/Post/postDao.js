exports.createPost = async (connection, params) => {
    const { content, userIdx } = params;
    const query = `
        INSERT INTO Post 
        (content, userIdx)
        VALUES
        ("${content}", "${userIdx}");
    `;
    const [postRows] = await connection.query(query);
    return postRows;
}

exports.createImgUrl = async (connection, params) => {
    const { imgUrlIter, postIdx } = params;
    const query = `
        INSERT INTO PostImg
        (postIdx, imgUrl)
        VALUES
        ("${postIdx}", "${imgUrlIter.url}")
    `;
    connection.query(query);
}

exports.getPost = async (connection, params) => {
    const { postIdx } = params;
    const query = `
        SELECT postIdx, content
        FROM Post
        WHERE Post.postIdx = "${postIdx}"
    `;
    const [[postRows]] = await connection.query(query);
    return postRows;
}

exports.getPostImg = async (connection, params) => {
    const { postIdx } = params;
    const query = `
        SELECT postImgIdx, imgUrl
        FROM PostImg
        WHERE PostImg.postIdx = "${postIdx}";
    `
    const [postImgRows] = await connection.query(query);
    return postImgRows;
}

exports.getLastIdx = async (connection) => {
    const query = `
        SELECT LAST_INSERT_ID();
    `;
    const [postIdx] = await connection.query(query);
    return postIdx;
}

exports.createLike = async (connection, params) => {
    const { userIdx, postIdx } = params; 
    const query = `
        INSERT INTO PostLike
        (postIdx, userIdx)
        VALUES
        ("${postIdx}", "${userIdx}");
    `;
    const [likeRows] = await connection.query(query);
    return likeRows;
}

exports.deleteLike = async (connection, params) => {
    const { userIdx, postIdx } = params;
    const query = `
        DELETE FROM PostLike
        WHERE
        postIdx = "${postIdx}" and userIdx = "${userIdx}";
    `;
    const [likeRows] = await connection.query(query);
    return likeRows;
}

exports.likeCheck = async (connection, params) => {
    const { userIdx, postIdx } = params;
    const query = `
        SELECT postIdx, userIdx
        FROM PostLike
        WHERE postIdx = "${postIdx}" and userIdx = "${userIdx}"
    `;
    const [likeRows] = await connection.query(query);
    return likeRows;
}