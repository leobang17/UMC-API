// Modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Require Router

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
app.get('/', (req, res) => {
    res.send("으아앙");
})

module.exports = app;
