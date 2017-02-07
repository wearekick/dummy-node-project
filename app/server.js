'use strict'

// start coding here
var express = require('express')
var app = express()

<<<<<<< HEAD
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/poo', function (req, res) {
  res.send('Poo is funny')
})

app.listen(80)
=======
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
>>>>>>> origin/Kickfolio
