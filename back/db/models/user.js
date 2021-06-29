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
  role: {
    type: String,
    default: "USER"
  },
	created: Date,
})

module.exports = model('User', UserSchema)
