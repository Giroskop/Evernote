const router = require('express').Router()
const placemarkController = require('../../controllers/placemarkController')
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
