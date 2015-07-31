'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails

test('"Forgot password" connection: ', function (t) {
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

test('Create member from upload', function (t) {
  var memberMock = {
    id: '123',
    primary_email: 'hello@world.com'
  }

  Members
    .create(memberMock)
    .exec(function (error, item) {
      if (error) {
        console.log(error)
        t.end()
      } else {
        t.ok(item, 'member created')
        t.end()
      }
    })
})

test('Forgot password with ok member', function (t) {
  request(sails.hooks.http.app)
    .post('/forgotPassword')
    .send({email: 'hello@world.com'})
    .end(function (err, res) {
      t.ok(res.body.emailSent, 'email sent')
      t.end()
    })
})

test('Forgot password with non existing member', function (t) {
  request(sails.hooks.http.app)
    .post('/forgotPassword')
    .send({email: 'non@existing.com'})
    .end(function (err, res) {
      t.equals(res.statusCode, 400, 'bad request response')
      t.end()
    })
})
