'use strict'

const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')

const auth = require('./auth')
const dashboard = require('./dashboard')
const shop = require('./shop')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(session({
  secret: 'abcdefghi',
  resave: false,
  saveUninitialized: true
}))

// use handlebars as template engine
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname))

// apply authentication middleware and routing
auth.init(app)

// authenticated routing
const router = express.Router()
router.use(auth.middleware)
dashboard.init(router)
shop.init(router)
app.use('/app', router)

// serve up static content from public folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, function (err) {
  if (err) throw err
  console.log(`Server is listening on ${port}`)
})
