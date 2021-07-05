const Placemark = require('../db/models/placemark')
const moment = require('moment')

class PlacemarkController {
	async getAll(req, res) {
    const {notepadId} = req.body
		const placemarks = await Placemark.find({notepad: notepadId})
		res.status(200).json(placemarks)
	}
	async create(req, res) {

		const { name, text, notepadId, userId, bcColor } = req.body
		const image =
			req.file?.path?.replace(/\\/g, '/') || null
		if (!name) {
			return next(ApiError.badRequest('Недопустимое имя placemark'))
		}
		const placemark = await Placemark.create({
			name: name,
      text: text,
			image: image,
      notepad: notepadId,
			author: userId,
      bcColor: bcColor,
			created: moment().format('DD-MM-YY'),
		})
		return res.status(201).json(placemark)
	}
	async delete(req, res) {
		const { id } = req.body
		await Placemark.deleteOne({ _id: id })
		res.sendStatus(200)
	}
	async updateOne(req, res) {
		const { id } = req.body
		await Placemark.findOneAndUpdate({ _id: id }, {})
		res.sendStatus(200)
	}
	async getOne(req, res) {}
}
module.exports = new PlacemarkController()
