'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')
var requestPromise = require('request-promise')

var sails

test('"Sign up" connection: ', function (t) {
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

test('Signin member: ', function (t) {
  var memberMock = {
    username: 'some@email.com',
    password: 'secret'
  }

  request(sails.hooks.http.app)
    .post('/signin')
    .send(memberMock)
    .end(function (err, res) {
      t.ok(res.headers.location === '/user', 'redirect to home page')
      t.end()
    })
})

test('api#auth#signin => non existing user: ', function (t) {
  request(sails.hooks.http.app)
    .post('/signin')
    .send({ username: 'ivan@h.com', password: 'wrong' })
    .end(function (err, res) {
      t.ok(res.statusCode === 401, 'non existing user cannot sign in')
      t.end()
    })
})

test('api#auth#signin => a deactivated member cannot sign in: ', function (t) {
  var cookieSignIn
  var user = {
    primary_email: 'ivan@email.com',
    membership_type: 'annual-corporate',
    password: 'secret'
  }

  requestPromise({
    simple: false,
    resolveWithFullResponse: true,
    json: true,
    uri: 'http://localhost:3333/signup',
    method: 'POST',
    body: user
  }).then(function (res) {
    t.ok(res.statusCode === 302, 'signup succesful')
    return requestPromise(
      { simple: false
      , resolveWithFullResponse: true
      , json: true
      , uri: 'http://localhost:3333/signin'
      , method: 'POST'
      , body:
        { username: 'ivan@email.com'
        , password: 'secret'
        }
      }
    )
  }).then(function (res) {
    cookieSignIn = res.headers['set-cookie'].pop().split(';')[0]
    t.ok(res.statusCode === 200, 'signin succesful')
    return requestPromise(
      { simple: false
      , headers: { cookie: cookieSignIn }
      , resolveWithFullResponse: true
      , json: true
      , uri: 'http://localhost:3333/api/account'
      , method: 'PUT'
      , body: { activation_status: 'deactivated' }
      }
    )
  }).then(function (res) {
    t.ok(res.statusCode === 200, 'member has been deactivated')
    return requestPromise(
      { simple: false
      , resolveWithFullResponse: true
      , json: true
      , uri: 'http://localhost:3333/signin'
      , method: 'POST'
      , body:
        { username: 'ivan@email.com'
        , password: 'secret'
        }
      }
    )
  }).then(function (res) {
    t.ok(res.statusCode === 401, 'member cannot sign in when deactivated')
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})
