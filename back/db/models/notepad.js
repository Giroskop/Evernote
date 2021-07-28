const { Schema, model, pluralize } = require('mongoose')

const NotepadSchema = new Schema({
	name: String,
	placemarks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Placemark',
		},
	],
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
	created: String,
  position: Number,
})

module.exports = model('Notepad', NotepadSchema)
