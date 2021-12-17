// Services
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

exports.getImgUrl = async (connection, params) => {
    const { postIdx } = params;
    const query = `
        SELECT postImgIdx, postIdx, imgUrl
        FROM PostImg
        WHERE postIdx = "${postIdx}";
    `;
    const [imgUrlRows] = await connection.query(query);
    return imgUrlRows;
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
};

exports.deleteImgUrl = async (connection, params) => {
    const { postIdx } = params;
    const query = `
        DELETE FROM PostImg
        WHERE postIdx = "${postIdx}";
    `;
    const [imgUrlRows] = await connection.query(query);
    return imgUrlRows;
}

exports.getPost = async (connection, params) => {
    const { postIdx } = params;
    const query = `
        SELECT p.postIdx, u.userIdx, u.nickname, p.content, p.createdAt
        FROM Post p
        JOIN User u 
        ON p.userIdx = u.userIdx
        WHERE p.postIdx = "${postIdx}"
    `;
    const [[postRows]] = await connection.query(query);
    return postRows;
}

exports.updatePost = async (connection, params) => {
    const { postIdx, content } = params;
    const query = `
        UPDATE Post
        SET content = "${content}"
        WHERE postIdx = "${postIdx}";
    `;
    const [postRows] = await connection.query(query);
    return postRows;
}

exports.deletePost = async (connection, params) => {
    const { userIdx, postIdx } = params;
    const query = `
        DELETE FROM Post
        WHERE postIdx = "${postIdx}" and userIdx = "${userIdx}";
    `;
    const [postRows] = await connection.query(query);
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

exports.createComment = async (connection, params) => {
    const { postIdx, userIdx, content } = params;
    const query = `
        INSERT INTO Comment
        (postIdx, userIdx, content)
        VALUES 
        ("${postIdx}", "${userIdx}", "${content}");
    `;
    const [commentRows] = await connection.query(query);
    return commentRows;
}

exports.searchPost = async (connection, params) => {
    const { keywords } = params;
    let whereQuery = "";
    keywords.map((keyword, index) => {
        if (index !== keywords.length - 1) {
            whereQuery += `content LIKE "%${keyword}%" OR \n`
        } else {
            whereQuery += `content LIKE "%${keyword}%"`
        }
    });
    
    const query = `
        SELECT p.postIdx, u.userIdx, u.nickname, u.email, p.content, p.createdAt
        FROM Post p
        JOIN User u
        ON p.userIdx = u.userIdx
        WHERE (
            ${whereQuery}
        );
    `;
    const [postRows] = await connection.query(query);
    return postRows;
}

exports.deleteComment = async (connection, params) => {
    const { commentIdx } = params;
    const query = `
        DELETE FROM Comment
        WHERE commentIdx = "${commentIdx}";
    `;
    const [commentRows] = await connection.query(query);
    return commentRows;
}

exports.updateComment = async (connection, params) => {
    const { commentIdx, content } = params;
    const query = `
        UPDATE Comment
        SET content = "${content}"
        WHERE commentIdx = "${commentIdx}";
    `;
    const [commentRes] = await connection.query(query);
    return commentRes;
}

exports.createLikeOrBookmark = async (connection, params) => {
    const { userIdx, postIdx, targetTable } = params; 
    const query = `
        INSERT INTO ${targetTable}
        (postIdx, userIdx)
        VALUES
        ("${postIdx}", "${userIdx}");
    `;
    const [likeOrBookmarkRows] = await connection.query(query);
    return likeOrBookmarkRows;
}

exports.deleteLikeOrBookmark = async (connection, params) => {
    const { userIdx, postIdx, targetTable } = params;
    const query = `
        DELETE FROM ${targetTable}
        WHERE
        postIdx = "${postIdx}" and userIdx = "${userIdx}";
    `;
    const [likeOrBookmarkRows] = await connection.query(query);
    return likeOrBookmarkRows;
}

exports.createHashtag = async (connection, params) => {
    const { hashtag } = params
    const query = `
        INSERT INTO Hashtag (name)
        VALUES ("${hashtag}")
    `
    const [hashtagRows] = await connection.query(query);
    return hashtagRows;
}

exports.createHashtagInter = async (connection, params) => {
    const { hashtagIdx, postIdx } = params;
    const query = `
        INSERT INTO TagIntermediate (hashtagIdx, postIdx)
        VALUES ("${hashtagIdx}", "${postIdx}");
    `;
    await connection.query(query);
}

// Provider
exports.commentCheck = async (connection, params) => {
    const { commentIdx } = params;
    const query = `
        SELECT postIdx, userIdx
        FROM Comment
        WHERE commentIdx = "${commentIdx}";
    `;
    const [[commentRows]] = await connection.query(query);
    return commentRows;
    
};


exports.likeOrBookmarkCheck = async (connection, params) => {
    const { userIdx, postIdx, targetTable } = params;
    const query = `
        SELECT postIdx, userIdx
        FROM ${targetTable}
        WHERE postIdx = "${postIdx}" and userIdx = "${userIdx}"
    `;
    const [likeOrBookmarkRows] = await connection.query(query);
    return likeOrBookmarkRows;
};

exports.hashtagCheck = async (connection, params) => {
    const { hashtag } = params;
    const query = `
        SELECT hashtagIdx, name
        FROM Hashtag
        WHERE name = "${hashtag}";
    `;

    const [[hashtagRows]] = await connection.query(query);
    return hashtagRows;
}