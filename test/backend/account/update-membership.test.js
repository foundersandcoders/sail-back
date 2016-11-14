'use strict'

var test = require('tape')
var request = require('request-promise')
var server = require('../_bootstrap/startServer.js')
var r = require('ramda')

var membership_types = require('../../../api/hooks/create_database_entries/mocks.js').membershipTypes()
var membership_prices = membership_types.reduce(function (prices, membership_type) {
  prices[membership_type.value] = membership_type.amount
  return prices
}, {})

test('Update membership connection: ', function (t) {
  server(function (err, server_started) {
    if (err) return t.end(err)
    t.ok(server_started, '...connection okay!')
    t.end()
  })
})

test('api#update-membership-type => annual-single to annual-double (balance due outstanding)', function (t) {
  var cookies

  request({
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/signin',
      method: 'POST',
      body: {
        username: 'jmurphy.web@gmail.com',
        password: 'correct'
      }
  }).then(function (res) {
    cookies = res.headers['set-cookie'].pop().split(';')[0]
    t.ok(res.statusCode === 200, 'signin succesful')
    return request({
      simple: false,
      headers: {
        cookie: cookies
      },
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/api/account',
      method: 'PUT',
      body: {
        membership_type: 'annual-double'
      }
    })
  }).then(function (res) {
    t.ok(res.body.membership_type === 'annual-double', 'membership changed from single to double')
    return request({
      simple: false,
      headers: {
        cookie: cookies
      },
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/api/account',
      method: 'GET'
    })
  }).then(function (res) {
    var today = new Date()
    var last_payment = r.last(res.body.payments)
    t.ok(
      last_payment.date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(),
      'Upgraded subscription charge added today'
    )
    t.ok(last_payment.amount === (membership_prices['annual-double'] - membership_prices['annual-single']))
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})

test('api#update-membership-type => annual-single to annual-double (balance due 0)', function (t) {
  var cookies

  request({
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/signin',
      method: 'POST',
      body: {
        username: 'ivan@foundersandcoders.com',
        password: 'correct'
      }
  }).then(function (res) {
    cookies = res.headers['set-cookie'].pop().split(';')[0]
    t.ok(res.statusCode === 200, 'signin succesful')
    return request({
      simple: false,
      headers: {
        cookie: cookies
      },
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/api/account',
      method: 'PUT',
      body: {
        membership_type: 'annual-double'
      }
    })
  }).then(function (res) {
    t.ok(res.body.membership_type === 'annual-double', 'membership changed from single to double')
    return request({
      simple: false,
      headers: {
        cookie: cookies
      },
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/api/account',
      method: 'GET'
    })
  }).then(function (res) {
    console.log(res)
    var today = new Date()
    var last_payment = r.last(res.body.payments)
    t.ok(res.body.membership_type.amount === membership_prices['annual-double'], 'membership subscription amount correct')
    t.ok(
      last_payment.date !== (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(),
      'No subscription updgrade surcharge added'
    )
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})
