'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')
var mocks = require('../../../api/hooks/create_database_entries/mocks.js')

var sail
var Cookies
var MEMBER

test('Start server: ', function (t) {
  server(function (err, serverStarted) {
    if (err) {
      throw err
      t.end()
    } else {
      sails = serverStarted
      t.ok(serverStarted, '..server started')
      t.end()
    }
  })
})

test('Sign up and get cookies', function (t) {
  request(sails.hooks.http.app)
    .post('/signup')
    .send({
      first_name: 'Besart',
      last_name: 'Hoxhaj',
      primary_email: 'accountMember@email.com',
      password: 'correct',
    membership_type: 'annual-corporate'})
    .end(function (err, res) {
      // console.log('FROM SIGNIN', res)

      Cookies = res.headers['set-cookie'].pop().split(';')[0]
      t.equals(res.statusCode, 302, 'redirected')
      t.ok(res.text.indexOf('Redirecting to /') > -1, 'redirect to home page')
      t.end()
    })
})

test('Update member', function (t) {
  var req = request(sails.hooks.http.app).put('/api/account')
  req.cookies = Cookies

  req
    .send({
      last_name: 'Shyti'
    }).end(function (err, res) {
    t.equals(res.statusCode, 200, 'status code 200')
    t.equals(res.body.primary_email, 'accountMember@email.com', 'got member back')

    Members
      .findOne({primary_email: 'accountMember@email.com'})
      .exec(function (errDb, memberDb) {
        t.equals(memberDb.last_name, 'Shyti', 'member updated')
        t.end()
      })
  })
})
