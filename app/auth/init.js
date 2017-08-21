'use strict'

const passport = require('passport')

const sdk = require('../lib/sdk')

const authController = require('./controller')

passport.serializeUser((user, done) => {
  if (user && user.authenticated) return done(null, user.siteId)
  done(null)
})

passport.deserializeUser(async (siteId, done) => {
  if (!siteId) return done(null)
  try {
    // TO DO FETCH USER/SITE DATA
    // const user = await sdk.user.fetch(siteId)
    // if (!user || !user.authenticated) return done(null)
    // done(null, user)
    const user = { siteId }
    done(null, user)
  } catch (error) {
    done(error)
  }
})

const init = (app) => {
  // setup local passport strategy
  passport.use(authController.loginStrategy)
  // attach strategy as middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // set routes
  app.get('/', authController.welcome)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/app/dashboard',
    failureRedirect: '/'
  }))
  app.get('/logout', authController.logout)
}

module.exports = init
