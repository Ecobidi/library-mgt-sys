const CategoryService = require('../services/category')

class CategoryController {

  static async getCategories(req, res, next) {
    const categories = await CategoryService.findAll()
    res.render('categories', {categories})
  }

  static async createCategoryPage(req, res, next) {
    res.render('new-category')
  }

  static async createCategory(req, res, next) {
    let category = req.body
    try {
      category = await CategoryService.insertOne(category)
      res.redirect('/categories')
    } catch (error) {
      req.flash('error_msg', 'Error inserting category to database')
      res.redirect('/categories/new')
    }
  }

  static async removeCategory(req, res, next) {
    const category_id = req.params.category_id
    try {
      await CategoryService.remove(category_id)
      res.redirect('/categories')
    } catch (error) {
      req.flash('error_msg', 'Error removing category from database')
      res.redirect('/categories')
    }
  }
}

module.exports = CategoryController