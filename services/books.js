const BookModel = require('../models/book')

class BookService {
  static async findAll() {
    return BookModel.find()
  }

  static async findByTitle(title) {
    let pattern = new RegExp(title, 'ig')
    return BookModel.find({title: pattern})
  }

  static async findByAuthor(author) {
    let pattern = new RegExp(author, 'ig')
    return BookModel.find({author: pattern})
  }

  static async findByCategory(category) {
    let pattern = new RegExp(category, 'ig')
    return BookModel.find({category: pattern})
  }

  static async insertBook(book) {
    return BookModel.create(book)
  }

  static async findBook(id) {
    return BookModel.findById(id)
  }

  static async deleteBook(id) {
    return BookModel.findByIdAndRemove(id)
  }

  static async updateBookQty(id, byValue) {
    let book = await BookModel.findById(id)
    book.qty = book.qty + byValue
    return book.save()
  }

  
}

module.exports = BookService