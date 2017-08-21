'use strict'

const express = require('express')

const category = require('./category')
const product = require('./product')

const init = (router) => {
  const expressRouter = express.Router()
  router.use('/shop', expressRouter)
  category.init(expressRouter)
  product.init(expressRouter)
}

module.exports = {
  init,
  category,
  product
}
