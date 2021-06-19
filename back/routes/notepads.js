const express = require('express')
const router = express.Router()
const Notepad = require('../db/models/notepad')

/* GET home page. */
router
	.route('/')
	.get(async (req, res) => {})
	.post(async (req, res) => {
		const newNotepad = await Notepad.create({
			title: req.body.notepadTitle,
			created: Date.now(),
		})
		res.json(newNotepad)
	})

module.exports = router
