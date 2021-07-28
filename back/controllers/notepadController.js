const Notepad = require('../db/models/notepad')
const ApiError = require('../error/ApiError')
const moment = require('moment')

class NotepadController {
	async getAll(req, res) {
		const { authorId } = req.query
		const notepads = await Notepad.find({ author: authorId })
		res.json(notepads)
	}
	async create(req, res, next) {
		const { name, userId } = req.body
		const image =
			req.file?.path?.replace(/\\/g, '/') || 'public/default/notepadImage.webp'
		if (!name) {
			return next(ApiError.badRequest('Недопустимое имя'))
		}
    const count = await Notepad.count({author: userId})
		const notepad = await Notepad.create({
			name: name,
			author: userId,
			image: image,
			created: moment().format('DD-MM-YY'),
      position: count,
		})
		return res.status(201).json(notepad)
	}
	async delete(req, res) {
		const { notepadId } = req.body
		const notepads = await Notepad.findOneAndDelete({ notepadId: notepadId })
		res.sendStatus(201)
	}
	async updateOne(req, res) {
		const { id } = req.body
		await Notepad.findOneAndUpdate({ _id: id }, {})
		res.sendStatus(200)
	}
}
module.exports = new NotepadController()
