'use strict'

var test = require('tape')
var server = require('./startServer.js')

// test('Initialize server', function (t) {
//   server(function (err, instance) {
//     t.ok(instance, 'got instance')
//     t.end()
//   })
// })

// TODO: this setTimeout is there so that the hooks can run and the database
// can be filled in. Should think of another way to do this really.

test('Initialize server', function (t) {
  t.plan(1)
  server(function (err, instance) {
    setTimeout(function () {
      t.ok(instance, 'got instance')
      t.end()
    }, 4000)
  })
})
