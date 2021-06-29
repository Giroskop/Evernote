const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')
const express = require('express');
const session = require('express-session')
const path = require('path');
const logger = require('morgan');
const cors = require('cors')

function middleware(app) {

	app.use(logger('dev'))
	app.use(express.json())
	app.use(express.static(path.join(__dirname,'..', 'public', 'img')))
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())
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
				mongoUrl: process.env.DB_URL,
			}),
		})
	)
}

function protect(req, res, next) {
  if (!req.session.user) {
    res.send('no session')
  }
  next()
}

module.exports = {middleware, protect}
