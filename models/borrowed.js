const mongoose = require('mongoose')

const BorrowedSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
  },
  memberName: {
    type: String,
  },
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  bookTitle: {
    type: String,
  },
  bookAuthor: {
    type: String,
  },
  dateBorrowed: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateDue: {
    type: Date,
    required: true
  },
  librarianName: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  returned: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Borrowed', BorrowedSchema)