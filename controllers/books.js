const BookService = require('../services/books')
const BorrowedService = require('../services/borrowed')
const CategoryService = require('../services/category')
const MemberService = require('../services/member')

class BookController {
  static async getBooks(req, res, next) {
    let books
    let keyword = req.query.keyword
    if (keyword) {
      switch (req.query.search_type) {
        case 'book_title': {
          books = await BookService.findByTitle(keyword)
          break;
        }
        case 'book_author': {
          books = await BookService.findByAuthor(keyword)
          break;
        }
        case 'book_category': {
          books = await BookService.findByCategory(keyword)
          break;
        }
        default: {
          books = await BookService.findAll()
        }
      }
      return res.render('books', {books})
    } else {
      books = await BookService.findAll()
      res.render('books', {books})
    }
  }
  
  static async getNewBookPage(req, res, next) {
    let categories = await CategoryService.findAll()
    res.render('book-edit', {categories})
  }

  static async getIssueBookPage(req, res, next) {
    let book = await BookService.findBook(req.params.bookId)
    res.render('issue-book', {book})
  }

  static async handleIssueBook(req, res, next) {
    const bookId = req.params.bookId
    let dao = req.body
    dao.librarianName = req.session.user.first_name + ' ' + req.session.user.last_name
    try {
      let member = await MemberService.findOne({memberId: dao.memberId})

      if (!member) {
        console.log('member does not exist')
        // member doesn't exist
        req.flash('warning_msg', 'Member Doesn\'t exists!')
        res.redirect('/books/borrowed')
      } else {
        // check if member already borrowed book
        let temp = await BorrowedService.findOne({bookId, memberId: dao.memberId})
        if (temp) {
          // member already borrowed book, therefore terminate request
          console.log('member already borrowed this book')
          req.flash('warning_msg', 'Member already borrowed this book')
          res.redirect('/books/borrowed')
        } else {
          await BorrowedService.create(dao)
          // await BookService.updateBookQty(bookId, -1)
          res.redirect('/books/borrowed')
        }
      }

    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error issueing book')
      res.redirect('/books/borrowed')
    }
  }

  static async createBook(req, res, next) {
    let book = req.body
    try {
      await BookService.insertBook(book)
      res.redirect('/books')
    } catch (error) {
      console.log('error occurred')
      console.log(error)
      req.flash('error_msg', 'Error inserting book to database')
      res.redirect('/books/new')
    }
  }

  static async removeBook(req, res, next) {
    let bookId = req.params.book_id
    try {
      await BookService.deleteBook(bookId)
      req.flash('success_msg', 'Book Removed')
      res.redirect('/books')
    } catch (error) {
      req.flash('error_msg', 'Error removing book from database')
      res.redirect('/books')
    }
  }

  static async getBorrowedBooksPage(req, res) {
    let books
    let keyword = req.query.keyword
    if (keyword) {
      switch (req.query.search_type) {
        case 'book_title': {
          books = await BorrowedService.findByTitle(keyword)
          break;
        }
        case 'book_author': {
          books = await BorrowedService.findByAuthor(keyword)
          break;
        }
        case 'member_id': {
          books = await BorrowedService.findByMemberId(keyword)
          break;
        }
        default: {
          books = await BorrowedService.findAll()
        }
      }
      return res.render('borrowed-books', {books})
    } else {
      books = await BorrowedService.findAll()
      res.render('borrowed-books', {books})
    }
  }

  static async returnBorrowed(req, res) {
    let borrowed_id = req.params.borrowed_id
    try {
      await BorrowedService.returnBook(borrowed_id)
      res.redirect('/books/borrowed')
    } catch (error) {
      console.log(error)
      res.redirect('/books/borrowed')      
    }
  }

}

module.exports = BookController