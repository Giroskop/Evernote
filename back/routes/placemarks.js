const express = require('express')
const router = express.Router()
const Placemarks = require('../db/models/placemark')

/* GET home page. */
router
	.route('/')
	.get(async (req, res) => {})
	.post(async (req, res) => {
		await Placemarks.create({
			title: req.body.placemarkTitle,
			created: Date.now(),
		})
		res.sendStatus(200)
	})

module.exports = router
