const Notepad = require('../db/models/notepad')
const Placemark = require('../db/models/placemark')
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
		const notepad = await Notepad.create({
			name: name,
			author: userId,
			image: image,
			created: moment().format('DD-MM-YY'),
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
	async getOne(req, res) {
    const {id} = req.params
		const placemarks = await Placemark.find({notepad: id})
		res.status(200).json(placemarks)
	}
}
module.exports = new NotepadController()
