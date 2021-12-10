// Modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');


// Require Router
const { authRouter, postRouter, userRouter } = require('../src/app');


// ENV variables
dotenv.config();


// Express App
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKEI_SECRET));
app.use(morgan('dev'));
app.use(cors());


// Routers
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);


module.exports = app;
