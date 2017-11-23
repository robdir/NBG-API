const mongoose = require('../config/database')
const { Schema } = mongoose

const bookSchema = new Schema({
  title: { type: String, required: false },
  price: { type: String, required: true }
})

module.exports = mongoose.model('books', bookSchema)
