'use strict'

var Task = require('data.task')
var request = require('xhr')

function get (path) {
  return new Task(function(reject, resolve) {
    request({ method: 'GET', uri: path }, function (err, res, body) {
    
      if (err) reject(err)
      else resolve(res)  
    })
  })
}

module.exports = get
