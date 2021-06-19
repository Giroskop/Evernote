
const express = require('express');
const {middleware} = require('./middleware/middleware')

const indexRouter = require('./routes/index');
const authRouter=  require('./routes/auth')
const usersRouter = require('./routes/users');
const notepadsRouter = require('./routes/notepads')
const placemarksRouter = require('./routes/placemarks')


const app = express();
middleware(app)

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/notepads', notepadsRouter)
app.use('/placemarks', placemarksRouter)

module.exports = app;
