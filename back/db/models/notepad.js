const { Schema, model, pluralize } = require('mongoose')

const NotepadSchema = new Schema({
	name: String,
	markplaces: [
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
	created: Date,
})

module.exports = model('Notepad', NotepadSchema)
