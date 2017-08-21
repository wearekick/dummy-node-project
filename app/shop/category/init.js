'use strict'

const categoryController = require('./controller')

const init = (router) => {
  router.get('/categories', categoryController.categories)
  router.get('/categories.json', categoryController.categoriesJson)
  router.get('/categories/:categoryId', categoryController.category)
}

module.exports = init
