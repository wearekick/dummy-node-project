'use strict'

const config = require('../../config')
const MySQLConnection = require('./MySQLConnection')

module.exports = {
  kickCommerce: new MySQLConnection(config.db.kickCommerce)
}
