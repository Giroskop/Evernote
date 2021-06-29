const {Schema, model, pluralize} = require('mongoose')

const PlacemarkSchema = new Schema({
	name: String,
  description: String,
	tags: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
	created: Date,
})

module.exports = model('Placemark', PlacemarkSchema)
