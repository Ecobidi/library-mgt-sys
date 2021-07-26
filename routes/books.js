const router = require('express').Router()
const BookController = require('../controllers/books')

router.get('/', BookController.getBooks)

router.get('/borrowed', BookController.getBorrowedBooksPage)

router.get('/return-borrowed/:borrowed_id', BookController.returnBorrowed)

router.get('/issue/:bookId', BookController.getIssueBookPage)

router.post('/issue/:bookId', BookController.handleIssueBook)

router.get('/new', BookController.getNewBookPage)

router.post('/new', BookController.createBook)

router.get('/remove/:book_id', BookController.removeBook)

module.exports = router