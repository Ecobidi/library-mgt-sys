const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }
})

module.exports = mongoose.model('members', MemberSchema)