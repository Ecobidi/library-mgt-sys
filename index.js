const express = require('express')
require('dotenv').config()
const expressSession = require('express-session')
const connectFlash = require('connect-flash')
const mongoose = require('mongoose')

// routes
const bookRouter = require('./routes/books')
const categoryRouter = require('./routes/category')
const memberRouter = require('./routes/member')
const librarianRouter = require('./routes/librarian')
const LoginRouter = require('./routes/login')

// models
const BookModel = require('./models/book')
const BorrowedModel = require('./models/borrowed')
const MemberModel = require('./models/member')
const LibrarianModel = require('./models/librarian')

let { domain, APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, owner_name, owner_mat_no} = require('./config')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// mongoose.connection.once('connected', () => {
//   console.log('db connected')
// })

// mongoose.connection.once('error', () => {
//   console.log('db encountered an error')
// })


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qmunc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected to ' + process.env.DB_NAME + ' database.')
} catch (error) {
  console.log('Error connecting to ' + process.env.DB_NAME + ' database.')
  console.log(error)
}

let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(expressSession({
  secret: 'mysecret',
  saveUninitialized: true,
  resave: true
}))

app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'admin', first_name: 'Chukwuemeka', last_name: 'Udechukwu' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME

  next()
})

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let book_count = await BookModel.count()
    let borrowed_count = await BorrowedModel.count()
    let librarian_count = await LibrarianModel.count()
    let member_count = await MemberModel.count()
    res.render('dashboard', {book_count, borrowed_count, member_count, librarian_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      book_count: 0, borrowed_count: 0, member_count: 0, librarian_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)


app.get('/', (req, res) => {
  res.render('dashboard')
})

app.use('/books', bookRouter)

app.use('/categories', categoryRouter)

app.use('/members', memberRouter)

app.use('/librarians', librarianRouter)

app.listen(process.env.PORT, () => { console.log(`${APPNAME} running on port ${process.env.PORT}`) })