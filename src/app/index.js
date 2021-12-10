const authRouter = require('./Auth/authRoute');
const postRouter = require('./Post/postRoute');
const userRouter = require('./User/userRoute');

module.exports = {
    authRouter,
    postRouter,
    userRouter,
}