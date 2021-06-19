const {Schema, model, pluralize} = require('mongoose')

const PlacemarkSchema = new Schema({
	title: String,
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Tag',
		},
	],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
	created: Date,
})

module.exports = model('Placemark', PlacemarkSchema)
