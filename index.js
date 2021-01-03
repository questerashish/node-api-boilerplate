require('dotenv').config();
const express = require('express');
const { urlencoded, json } = require('body-parser');
const cookieParser = require('cookie-parser');

const applicationInitializer = require('./src');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cookieParser(process.env.COOKIE_SECRET));

applicationInitializer(app).then(() => {
    const PORT = process.env.PORT || 9000;
    console.info(`LISTENING TO PORT:`, PORT);
    app.listen(PORT);
})