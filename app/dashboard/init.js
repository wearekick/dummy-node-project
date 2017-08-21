'use strict'

const path = require('path')

const init = (router) => {
  router.get('/dashboard', renderDashboard)
}

const renderDashboard = (req, res) => {
  res.render(path.join(__dirname, '/dashboard'))
}

module.exports = init
