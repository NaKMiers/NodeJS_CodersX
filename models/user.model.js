const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: String,
	password: String,
	email: String,
	avatar: String,
	phone: String
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User