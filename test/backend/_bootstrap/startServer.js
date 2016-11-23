// Just starts the server and passes the object to the callback

'use strict'

var Sails = require('sails')

var sailsInstance

module.exports = start

function start (callback) {
  if (!sailsInstance) {
    return Sails.lift({
      log: {
        level: 'error'
      },
      port: 3333
    }, function (err, instance) {
      if (err) return console.error('Sails lifting error: ', err)
      sailsInstance = instance
      return callback.apply(null, arguments)
    })
  } else {
    return callback(null, sailsInstance)
  }
}
