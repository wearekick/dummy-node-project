'use strict'

const mysql = require('mysql')

class MySQLConnection {

  constructor (config) {
    if (!config) return
    this._config = config
    this.pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database
    })
  }

  query (sql, values, callback) {
    return new Promise((resolve, reject) => {
      if (typeof values === 'function' && !callback) {
        callback = values
        values = []
      }
      this.pool.query(sql, values, (error, results) => {
        if (error) {
          console.log(error)
          // reject('Unable to retrieve data')
          return
        }
        resolve(results)
      })
    })
  }

}

module.exports = MySQLConnection
