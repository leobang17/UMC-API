const app = require('./config/express');
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on PORT ${process.env.PORT}...`);
})