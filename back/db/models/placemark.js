const { Schema, model, pluralize } = require('mongoose')

const PlacemarkSchema = new Schema({
	name: String,
	text: String,
	tags: [String],
	image: String,
	notepad: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	bcColor: String,
	created: String,
})

module.exports = model('Placemark', PlacemarkSchema)
