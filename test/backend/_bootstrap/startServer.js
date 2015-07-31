// Just starts the server and passes the object to the callback

'use strict'

var Sails = require('sails')

var sailsInstance

module.exports = start

function start (callback) {
  if (!sailsInstance) {
    Sails.lift({
      log: {
        level: 'error'
      },
      port: 3333
    }, function (err, instance) {
      sailsInstance = instance
      return callback.apply(null, arguments)
    })
  } else {
    return callback.apply(null, [null, sailsInstance])
  }
}
