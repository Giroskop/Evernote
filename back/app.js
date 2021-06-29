require('dotenv').config()
const express = require('express');
const {middleware} = require('./middleware/middleware')
const apiErrorMiddleware = require('./middleware/apiErrorMiddleware')

const app = express();
const router = require('./routes/api/index')

// app.use('/', indexRouter)

middleware(app)
app.use('/api', router)
app.use(apiErrorMiddleware)
module.exports = app;
