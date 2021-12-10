exports.selectUserEmail = async (connection, email) => {
    const selecrUserEmailQuery = `
        SELECT email, nickname
        FROM User
        WHERE email = "${email}";
    `;
    const emailRows = await connection.query(selecrUserEmailQuery);
    return emailRows[0];
}

exports.createUser = async (connection, userParams) => {
    const { email, hash, nickname, profileImgUrl, introduction } = userParams;
    const createUserQuery = `
        INSERT INTO User 
        (nickname, email, password, profileImgUrl, introduction)
        VALUES
        ("${nickname}", "${email}", "${hash}", "${profileImgUrl}", "${introduction}");
    `;

    const createUserRows = await connection.query(createUserQuery);

    return createUserRows[0];
}