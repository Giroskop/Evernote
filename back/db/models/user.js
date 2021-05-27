const {Schema, model, pluralize} = require('mongoose')

const UserSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  email: String,
  password: String,
  created: Date
})

module.exports = model('users', UserSchema)
