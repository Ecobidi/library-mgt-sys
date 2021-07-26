const path = require('path')
const LibrarianService = require('../services/librarian')

class LibrarianController {

  static async getLibrariansPage(req, res) {
    let librarians = await LibrarianService.findAll()
    res.render('librarians', {librarians})
  }

  static async createLibrarianPage(req, res) {
    res.render('librarians-new', { error_msg: req.flash('error_msg') })
  }

  static async createLibrarian(req, res) {
    let dao = req.body
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.redirect('/librarians/new')
    }
    try {
      // check for same librarianname
      let samelibrarianname1 = await LibrarianService.findByUsername(dao.username)
      if (samelibrarianname1) {
        req.flash('error_msg', 'librarianname is already taken')
        return res.redirect('/librarians/new')
      }
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'librarian_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await LibrarianService.create(dao)
      } else {
        await LibrarianService.create(dao)
      }
      res.redirect('/librarians')
    } catch (err) {
      console.log(err)
      res.redirect('/librarians')
    }
  }

  static async removeLibrarian(req, res) {
    try {
      await LibrarianService.removeOne(req.params.librarian_id)
      res.redirect('/librarians')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/librarians')
    }
  }

}

module.exports = LibrarianController