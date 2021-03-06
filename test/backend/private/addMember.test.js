'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails
var CookiesAdmin

test('"Add member" connection: ', function (t) {
  server(function (err, serverStarted) {
    if (err) {
      t.end(err)
    } else {
      sails = serverStarted
      t.ok(serverStarted, '..connection ok')
      t.end()
    }
  })
})

test('Sign in as admin', function (t) {
  request(sails.hooks.http.app)
    .post('/signin')
    .send({username: 'bes@foch.org', password: 'cnvo2hh89h'})
    .end(function (err, res) {
      // console.log('FROM SIGNIN', res)

      CookiesAdmin = res.headers['set-cookie'].pop().split(';')[0]
      t.ok(res.headers.location = '/', 'redirect to home page')
      t.end()
    })
})

test('Add member', function (t) {
  var req = request(sails.hooks.http.app).post('/addmember')

  req.cookies = CookiesAdmin

  var json = {
    id: 88888,
    date_joined: new Date(),
    primary_email: 'create@member.com',
    membership_type: 'life-single'
  }

  req
    .send(json)
    .end(function (err, res) {
      t.ok(res.body.primary_email, 'primary_email key available')
      t.end()
    })
})
