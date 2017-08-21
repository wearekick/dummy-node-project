'use strict'

const crypto = require('crypto')

const db = require('../db/connectionFactory').kickCommerce

// this needs to be decoupled!
const salt = 'Latvia!92758'

const user = module.exports = {}

user.login = async (username, password) => {
  const sql = 'SELECT site_id FROM site WHERE site_active = 1 AND site_username = ? AND site_password_hash = ? LIMIT 1'
  const response = await db.query(sql, [ username, user._hashPassword(password) ])
  if (!response || response.length !== 1) return { authenticated: false }
  return {
    authenticated: true,
    siteId: response[0].site_id
  }
}

user._hashPassword = (password) => crypto.createHash('md5').update((password + salt).split('').reverse().join('')).digest("hex")
