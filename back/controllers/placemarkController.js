const Placemark = require('../db/models/placemark')
const moment = require('moment')

class PlacemarkController {
	async get(req, res) {
    const { authorId } = req.query
		const placemarks = await Placemark.find({author: authorId})
    console.log(placemarks, '<<<<')
		res.status(200).json(placemarks)
	}
	async create(req, res) {
		const { name, text, notepadId, userId, bcColor } = req.body
		const image = req.file?.path?.replace(/\\/g, '/') || null
		if (!name && !text) {
			return next(ApiError.badRequest('Заполните хотя бы одно поле'))
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
		const { _id } = req.body
		await Placemark.deleteOne({ _id: id })
		res.sendStatus(200)
	}
	async update(req, res) {
		const { _id, name, text, image, bcColor } = req.body
		const placemark = await Placemark.findByIdAndUpdate(_id, {
				name: name,
				text: text,
        image: image,
        bcColor: bcColor
		}, {new: true})
		res.json(placemark)
	}
}
module.exports = new PlacemarkController()
