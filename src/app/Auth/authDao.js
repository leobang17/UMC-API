// 해당 email이 존재하는지 확인
exports.selectUserEmail = async (connection, email) => {
    const selecrUserEmailQuery = `
        SELECT email, nickname, password, userIdx
        FROM User
        WHERE email = "${email}";
    `;
    const [emailRows] = await connection.query(selecrUserEmailQuery);
    return emailRows;
}

// 회원가입
exports.createUser = async (connection, userParams) => {
    const { email, hash, nickname, profileImgUrl, introduction } = userParams;
    const createUserQuery = `
        INSERT INTO User 
        (nickname, email, password, profileImgUrl, introduction)
        VALUES
        ("${nickname}", "${email}", "${hash}", "${profileImgUrl}", "${introduction}");
    `;

    const [createUserRows] = await connection.query(createUserQuery);

    return createUserRows;
}