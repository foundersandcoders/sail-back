/*global
  sails, Members, Payments, MembershipTypes
*/

'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails
var Cookies

test('Start server: ', function (t) {
  server(function (err, serverStarted) {
    if (err) {
      t.end(err)
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
      t.equals(res.statusCode, 200, 'signed up')
      t.ok(res.headers.location === '/user', 'redirect to members view')
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
