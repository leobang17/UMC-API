// Modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const saveUserInfo = require('../src/passport');


// Require Router
const { authRouter, postRouter, userRouter } = require('../src/app');
const { verifyToken } = require('../src/middlewares');


// ENV variables
dotenv.config();


// Express App
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(saveUserInfo);
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'session-cookie'
}))


// Routers
app.use('/api/auth', authRouter);
app.use('/api/post', verifyToken, postRouter);
app.use('/api/user', verifyToken, userRouter);


module.exports = app;
