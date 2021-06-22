const express = require('express')
const router = express.Router()
const Notepad = require('../db/models/notepad')
const User = require('../db/models/user')

/* GET home page. */
router
	.route('/')
	.get(async (req, res) => {})
	.post(async (req, res) => {
		const newNotepad = await Notepad.create({
			title: req.body.notepadTitle,
      author: req.body.userId,
			created: Date.now(),
		})
    await User.findOneAndUpdate({})
		res.json(newNotepad)
	})

module.exports = router
