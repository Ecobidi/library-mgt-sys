const LibrarianModel = require('../models/librarian')

class LibrarianService {

  static async findByUsername(username) {
    return LibrarianModel.findOne({username})
  }
  
  static async findAll() {
    return LibrarianModel.find()
  }

  static async create(dao) {
    return LibrarianModel.create(dao)
  }

  static async removeOne(id) {
    return LibrarianModel.findByIdAndRemove(id)
  }

}

module.exports = LibrarianService