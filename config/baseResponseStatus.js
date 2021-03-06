//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {
    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_EXPIRED: { "isSuccess": false, "code": 2100, "message": "JWT 토큰이 만료되었습니다." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_PASSWORD_TYPE : { "isSuccess": false, "code": 2005, "message": "비밀번호는 특수문자, 영문, 숫자를 포함하여 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    POST_CONTENT_EMPTY : { "isSuccess": false, "code": 2019, "message": "글은 1글자 이상 작성해야 합니다."},
    
    LIKE_ALREADY_EXISTS : { "isSuccess": false, "code": 2020, "message": "이미 좋아요를 누른 글입니다." },
    LIKE_EMPTY: { "isSuccess": false, "code": 2021, "message": "좋아요가 되어있지 않은 상태 입니다." },
    
    BOOKMARK_ALREADY_EXISTS : { "isSuccess": false, "code": 2022, "message": "이미 북마크한 글입니다." },
    BOOKMARK_EMPTY : { "isSuccess": false, "code": 2023, "message": "북마크가 되어있지 않은 상태 입니다." },
        
    DELETE_POST_WRONG_USER : { "isSuccess": false, "code": 2024, "message": "본인이 작성한 글만 삭제할 수 있습니다"},
    UPDATE_POST_WRONG_USER : { "isSuccess": false, "code": 2024, "message": "본인이 작성한 글만 수정할 수 있습니다"},
    POST_NOT_EXIST: { "isSuccess": false, "code": 2025, "message": "존재하지 않는 포스트 입니다"},

    COMMENT_NOT_EXIST: { "isSuccess": false, "code": 2026, "message": "존재하지 않는 댓글입니다" },
    DELETE_COMMENT_WRONG_USER: { "isSuccess": false, "code": 2027, "message": "본인이 작성한 댓글만 삭제할 수 있습니다" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    USER_IS_SELF: { "isSuccess": false, "code": 3007, "message": "본인은 팔로우/언팔로우 할 수 없습니다" },
    USER_ALREADY_FOLLOWING: { "isSuccess": false, "code": 3008, "message": "이미 팔로우하고 있는 계정입니다" },
    USER_ALREADY_UNFOLLOWING: { "isSuccess": false, "code": 3009, "message": "이미 팔로우하지 않고 있는 계정입니다" },
    USER_NOT_EXIST: { "isSuccess": false, "code": 3010, "message": "존재하지 않는 유저입니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"}, 
}
