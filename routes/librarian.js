const router = require('express').Router()
// const { body } = require('express-validator')
const LibrarianController = require('../controllers/librarian')

router.get('/', LibrarianController.getLibrariansPage)

router.get('/new', LibrarianController.createLibrarianPage)

router.post('/new', LibrarianController.createLibrarian)

router.get('/remove/:librarian_id', LibrarianController.removeLibrarian)

module.exports = router