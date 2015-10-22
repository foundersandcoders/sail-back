'use strict'

var Task = require('data.task')
var request = require('xhr')

var post = require('./curry')(function (cb, path, body) {

  request({ method: 'POST', uri: path, json: body }, cb)
})

module.exports = require('./curry')(function (path, body) {

  return new Task(function (reject, resolve) {
    post(function (err, res, body) {
      if (err) reject(err)
      else resolve(res, body)
    }, path, body)})})
