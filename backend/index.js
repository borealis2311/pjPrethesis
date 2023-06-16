
// Allow using file .env
require('dotenv/config');
const express = require('express');
const ErrorAPI = require('./apiError');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;

// middleware
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// route
app.use('/', require('./src/route'))

// middleware catch error 404
app.use((req, res, next) => {
    const e = new ErrorAPI(404, 'Resource not found!')
    return next(e);
})

// middleware catch error server
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.message || 'Error from server';
    return res.status(status).json({
        err: true,
        message: msg
    })
})

app.listen(PORT, () => {
    console.log('server running on http://localhost:' + PORT);
})