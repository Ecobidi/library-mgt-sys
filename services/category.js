const CategoryModel = require('../models/category')
const BookModel = require('../models/book')

class CategoryService {

  static async findAll() {
    return CategoryModel.find()
  }

  static async insertOne(category) {
    return CategoryModel.create(category)
  }

  static async remove(id) {
    return CategoryModel.findByIdAndRemove(id)
  }

  static async findBooks(category) {
    return BookModel.find({category})
  }

}

module.exports = CategoryService