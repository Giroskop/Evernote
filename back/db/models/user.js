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
	password: String,
	created: Date,
})

module.exports = model('User', UserSchema)
