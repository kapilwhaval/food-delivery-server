require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const apis = require('./api');

const corsOptions = {
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apis);

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error connecting to database', err))

http.listen(process.env.PORT, () => console.log(`${process.env.NODE_ENV} server is listening on port`, process.env.PORT));