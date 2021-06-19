const { Schema, model, pluralize } = require('mongoose')

const NotepadSchema = new Schema({
	title: String,
	markplaces: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Placemark',
		},
	],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
	created: Date,
})

module.exports = model('Notepad', NotepadSchema)
