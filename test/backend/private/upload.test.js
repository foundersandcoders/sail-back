'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails
var Cookies
var CookiesAdmin

test('"Upload" connection: ', function (t) {
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

test('Sign up and get cookies', function (t) {
  request(sails.hooks.http.app)
    .post('/signup')
    .send({primary_email: 'uploadMember@email.com', password: 'correct', membership_type: 'annual-corporate'})
    .end(function (err, res) {
      // console.log('FROM SIGNIN', res)

      Cookies = res.headers['set-cookie'].pop().split(';')[0]
      t.ok(res.headers.location === '/', 'redirect to home page')
      t.end()
    })
})

test('Upload endpoint should be accesible only by admin', function (t) {
  var req = request(sails.hooks.http.app).post('/upload')

  req.cookies = Cookies

  req.end(function (err, res) {
    t.equals(res.statusCode, 404, 'not found')

    t.end()
  })
})

test('Sign in as admin', function (t) {
  request(sails.hooks.http.app)
    .post('/signin')
    .send({username: 'bes@foch.org', password: 'cnvo2hh89h'})
    .end(function (err, res) {
      // console.log('FROM SIGNIN', res)

      CookiesAdmin = res.headers['set-cookie'].pop().split(';')[0]
      t.ok(res.headers.location === '/', 'redirect to home page')
      t.end()
    })
})

test('Upload endpoint should upload PAYMENTS', function (t) {
  var req = request(sails.hooks.http.app).post('/upload?type=payments')

  req.cookies = CookiesAdmin

  var json = [
    {
      amount: 5,
      date: new Date(),
      deleted: false,
      member: '471800', // bes
      notes: 'Testing upload',
      reference: '61201',
      type_code: '8 - Standing Order'
    }
  ]

  req
    .send(json)
    .end(function (err, res) {
      t.equals(res.statusCode, 200, 'ok response')

      Members
        .findOne(json[0].member)
        .populate('payments')
        .exec(function (errDb, resDb) {
          t.equals(resDb.payments[resDb.payments.length - 1].notes, 'Testing upload', 'payment uploaded')
          t.end()
        })
    })
})

test('Upload endpoint should upload MEMBERS', function (t) {
  var req = request(sails.hooks.http.app).post('/upload?type=members')

  req.cookies = CookiesAdmin

  var json = [
    {
      id: '555555',
      title: 'Mr',
      first_name: 'Upload'
    }
  ]

  req
    .send(json)
    .end(function (err, res) {
      t.equals(res.statusCode, 200, 'ok response')

      Members
        .findOne(json[0].id)
        .populate('payments')
        .exec(function (errDb, resDb) {
          t.ok(resDb.id, 'member uploaded')
          t.end()
        })
    })
})

test('Upload endpoint called with no type', function (t) {
  var req = request(sails.hooks.http.app).post('/upload')

  req.cookies = CookiesAdmin

  var json = [
    {
      id: '555555',
      title: 'Mr',
      first_name: 'Upload'
    }
  ]

  req
    .send(json)
    .end(function (err, res) {
      t.equals(res.statusCode, 400, 'return bad request')
      t.end()
    })
})
