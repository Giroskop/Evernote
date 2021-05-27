const createError = require('http-errors');
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const MongoStore = require('connect-mongo')

function middleware(app) {
	// view engine setup
	app.set('views', path.join(__dirname,'..', 'views'))
	app.set('view engine', 'hbs')

	app.use(logger('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())
	app.use(express.static(path.join(__dirname, 'public')))
	app.use(cors())
	app.use(
		session({
			secret: 'f3sf398f02u3fhf',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: false,
				maxAge: 180 * 60 * 60 * 1000,
			},
			store: MongoStore.create({
				mongoUrl: 'mongodb://localhost:27017/p3w1d4t1',
			}),
		})
	)

	// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}

		// render the error page
		res.status(err.status || 500)
		res.render('error')
	})
}

function protect(req, res, next) {
  if (!req.session.user) {
    res.send('no session')
  }
  next()
}

module.exports = {middleware, protect}