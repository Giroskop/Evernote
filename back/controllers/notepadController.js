const uuid = require('uuid')
const path = require('path')
const Notepad = require('../db/models/notepad')
const ApiError = require('../error/ApiError')
class NotepadController {
	async create(req, res) {
		try {
			const { name, authorId } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.join(__dirname, '..', 'public', 'img', fileName))
			const notepad = await Notepad.create({
				name: name,
				image: fileName,
        author: authorId,
				created: Date.now()
			})
			return res.json(notepad)
		} catch (e) {
      next(ApiError.badRequest(e.msg))
    }
	}
	async getAll(req, res) {
    const {authorId} = req.body
		const notepads = await Notepad.find({author: authorId})
		res.json(notepads)
	}
	async getOne(req, res) {
		const { id } = req.params
		const notepad = await Notepad.findOne({ _id: id })
		res.json(notepad)
	}
}
module.exports = new NotepadController()
