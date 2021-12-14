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


exports.getPostIdx = async (connection) => {
    const query = `
        SELECT LAST_INSERT_ID();
    `;
    const [postIdx] = await connection.query(query);
    return postIdx;
}