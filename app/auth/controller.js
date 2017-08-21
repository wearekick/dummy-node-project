'use strict'

const LocalStrategy = require('passport-local').Strategy

const sdk = require('../lib/sdk')

const authController = module.exports = {}

authController.welcome = (req, res) => {
  res.render('auth/welcome', { layout: 'blank' })
}

authController.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

authController.loginStrategy = new LocalStrategy(
   async (username, password, done) => {
    const user = await sdk.user.login(username, password)
    if (!user.authenticated) done(null, false)
    done(null, user)
  }
)
