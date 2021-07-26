const mongoose = require('mongoose')

const LibrarianSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('librarians', LibrarianSchema)