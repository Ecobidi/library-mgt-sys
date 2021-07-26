const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  category: String,
  publisher: String,
  language: String,
  dateAdded: String,
  ISBN: String,
  year: Number,
  pages: Number,
  shelfNo: String,
  coverImage: String,
  qty: Number,
})

module.exports = mongoose.model('books', BookSchema)