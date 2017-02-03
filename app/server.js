'use strict'

// start coding here
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/poo', function (req, res) {
  res.send('Poo is funny')
})

app.listen(80)
