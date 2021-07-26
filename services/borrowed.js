const BorrowedModel = require('../models/borrowed')

class BorrowedService {
  static async findAll() {
    return BorrowedModel.find()
  }

  static async findByTitle(bookTitle) {
    let pattern = new RegExp(bookTitle, 'ig')
    return BorrowedModel.find({bookTitle: pattern})
  }

  static async findByAuthor(bookAuthor) {
    let pattern = new RegExp(bookAuthor, 'ig')
    return BorrowedModel.find({bookAuthor: pattern})
  }

  static async findByMemberId(memberId) {
    let pattern = new RegExp(memberId, 'ig')
    return BorrowedModel.find({memberId: pattern})
  }

  static async findOne(condition) {
    return BorrowedModel.findOne(condition)
  }

  static async create(data) {
    return BorrowedModel.create(data)
  }

  static async returnBook(id) {
    return BorrowedModel.findByIdAndUpdate(id, {$set: {returned: true}})
  }

  static async delete(id) {
    return BorrowedModel.findByIdAndRemove(id)
  }
}

module.exports = BorrowedService