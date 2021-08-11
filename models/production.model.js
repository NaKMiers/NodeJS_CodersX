const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productionSchema = new Schema({
	name: String,
	image: String,
	description: String,
})

const Production = mongoose.model('Production', productionSchema, 'productions')

module.exports = Production