'use strict'

const exphbs = require('express-handlebars')
const path = require('path')

const sdk = require('../../lib/sdk')

const categoryController = module.exports = {}

categoryController.partials = async () => {
  const hbs = exphbs.create({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'partials')
  })
  return await hbs.getPartials()
}

categoryController.categories = async (req, res) => {
  try {
    const [categoryTree, partials] = await Promise.all([
      categoryController._tree(req.user.siteId),
      categoryController.partials()
    ])
    res.render('shop/category/categories', { categoryTree, partials })
  } catch (error) {
    console.log(error)
  }
}

categoryController.category = async (req, res) => {
  const { categoryId } = req.params
  const { siteId } = req.user
  try {
    const [[category], categoryTree, partials] = await Promise.all([
      sdk.category.fetch({ categoryId, siteId }),
      categoryController._tree(siteId),
      categoryController.partials()
    ])
    res.render('shop/category/category', { category, categoryTree, partials })
  } catch (error) {
    console.log(error)
  }
}

categoryController.categoriesJson = (req, res) => {
  res.json({ foo: 'bar' })
}

categoryController._tree = async (siteId) => {
  const fields = ['id', 'name', 'code']
  const fetchedCategories = await sdk.category.fetch({ fields, siteId })
  const allCategories = {}

  const primaryClass = 'orange'
  const depthClass = ['darken-2', 'darken-1', '', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5']

  return fetchedCategories.reduce((collection, category) => {
    // create an empty array to add child categories to
    category.children = []
    category.depth = (category.code.length / 5) - 1
    category.class = `${primaryClass} ${depthClass[category.depth]}`
    category.hiddenTextClass = `${primaryClass}-text text-${depthClass[category.depth]}`
    allCategories[category.id] = category
    if (category.parentId > 0) {
      allCategories[category.parentId].children.push(category)
    } else {
      collection.push(category)
    }
    return collection
  }, [])
}
