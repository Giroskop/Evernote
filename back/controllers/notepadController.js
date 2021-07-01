const uuid = require('uuid')
const path = require('path')
const Notepad = require('../db/models/notepad')
const ApiError = require('../error/ApiError')
class NotepadController {
	async create(req, res) {
		const { name, userId } = req.body
    console.log(name, userId, '<<<<<<<<<<<<<<')
		if (!name) {
			return next(ApiError.badRequest('Недопустимое имя'))
		}
		const notepad = await Notepad.create({
			name: name,
			author: userId,
			created: Date.now(),
		})
    console.log('from back!')
		return res.status(201).json(notepad)
	}
	async getAll(req, res) {
		const { authorId } = req.query
		const notepads = await Notepad.find({ author: authorId })
		res.json(notepads)
	}
	async delete(req, res) {
		const { notepadId } = req.body
		const notepads = await Notepad.findOneAndDelete({ notepadId: notepadId })
		res.sendStatus(201)
	}
	async getOne(req, res) {
		const { id } = req.params
		const notepad = await Notepad.findOne({ _id: id })
		res.json(notepad)
	}
}
module.exports = new NotepadController()
