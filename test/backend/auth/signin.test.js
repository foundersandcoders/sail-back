'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails

test('"Sign up" connection: ', function (t) {
  server(function (err, serverStarted) {
    if (err) {
      throw err
      t.end()
    } else {
      sails = serverStarted
      t.ok(serverStarted, '..connection ok')
      t.end()
    }
  })
})

test('Signin member: ', function (t) {
  var memberMock = {
    username: 'some@email.com',
    password: 'secret'
  }

  request(sails.hooks.http.app)
    .post('/signin')
    .send(memberMock)
    .end(function (err, res) {
      t.ok(res.headers.location === '/', 'redirect to home page')
      t.end()
    })
})
