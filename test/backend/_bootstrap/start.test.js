'use strict'

var test = require('tape')
var server = require('./startServer.js')

test('Initialize server', function (t) {
  server(function (err, instance) {
    t.ok(instance, 'got instance')
    t.end()
  })
})
