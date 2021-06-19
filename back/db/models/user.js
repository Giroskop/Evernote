const { Schema, model, pluralize } = require('mongoose')

const UserSchema = new Schema({
	name: {
		firstName: String,
		lastName: String,
	},
	email: {
		type: String,
		unique: true,
	},
	data: {
		notepads: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Notepad',
			},
		],
		placemarks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Placemark',
			},
		],
	},
	password: String,
	created: Date,
})

module.exports = model('User', UserSchema)
