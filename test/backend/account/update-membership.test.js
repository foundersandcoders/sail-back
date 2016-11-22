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
var today = new Date()

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
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'due date changed correctly')
    t.ok(res.body.date_membership_type_changed === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'date membership type changed correct')
    t.ok(res.body.life_payment_date === null, 'life payment date null as annual subscription')
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
    var last_payment = r.last(res.body.payments)
    t.ok(
      last_payment.date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(),
      'Upgraded subscription charge added today'
    )
    t.ok(last_payment.amount === (membership_prices['annual-double'] - membership_prices['annual-single']), 'Updgraded subscription charge amount correct')
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
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'due date changed correctly')
    t.ok(res.body.date_membership_type_changed === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'date membership type changed correct')
    t.ok(res.body.life_payment_date === null, 'life payment date null as annual subscription')
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
    t.ok(res.body.membership_type.amount === membership_prices['annual-double'], 'membership subscription amount correct')
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'Due date set to today')
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})

test('api#update-membership-type => annual-family to annual-single (balance due outstanding)', function (t) {
  var cookies

  request({
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/signin',
      method: 'POST',
      body: {
        username: 'andrew@smelly.com',
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
        membership_type: 'annual-single'
      }
    })
  }).then(function (res) {
    t.ok(res.body.membership_type === 'annual-single', 'membership changed from family to single')
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'due date changed correctly')
    t.ok(res.body.date_membership_type_changed === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'date membership type changed correct')
    t.ok(res.body.life_payment_date === null, 'life payment date null as annual subscription')
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
    var last_payment = r.last(res.body.payments)
    t.ok(
      last_payment.date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(),
      'downgrade subscription refund added today'
    )
    t.ok(last_payment.amount === (membership_prices['annual-single'] - membership_prices['annual-family']), 'downgrade refund amount correct')
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})

test('api#update-membership-type => annual-double to annual-family (no balance due)', function (t) {
  var cookies

  request({
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/signin',
      method: 'POST',
      body: {
        username: 'alan@watts.com',
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
        membership_type: 'annual-family'
      }
    })
  }).then(function (res) {
    t.ok(res.body.membership_type === 'annual-family', 'membership changed from single to double')
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'due date changed correctly')
    t.ok(res.body.date_membership_type_changed === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'date membership type changed correct')
    t.ok(res.body.life_payment_date === null, 'life payment date null as annual subscription')
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
    t.ok(res.body.membership_type.amount === membership_prices['annual-family'], 'membership subscription amount correct')
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'Due date set to today')
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})

test('api#update-membership-type => annual-single to annual-family (no balance due but payments made before subscription)', function (t) {
  var cookies

  request({
      simple: false,
      resolveWithFullResponse: true,
      json: true,
      uri: 'http://localhost:3333/signin',
      method: 'POST',
      body: {
        username: 'siddharta@nirvana.com',
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
        membership_type: 'annual-family'
      }
    })
  }).then(function (res) {
    t.ok(res.body.membership_type === 'annual-family', 'membership changed from single to family')
    t.ok(res.body.due_date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'due date changed correctly')
    t.ok(res.body.date_membership_type_changed === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(), 'date membership type changed correct')
    t.ok(res.body.life_payment_date === null, 'life payment date null as annual subscription')
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
    var last_payment = r.last(res.body.payments)
    t.ok(
      last_payment.date === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).toISOString(),
      'Upgraded subscription charge added today'
    )
    t.ok(last_payment.amount === (membership_prices['annual-family'] - membership_prices['annual-single']), 'Upgraded subscription charge amount correct')
    t.ok(last_payment.category === 'subscription', 'added charge has correct category')
    t.end()
  }).catch(function (err) {
    t.end(err)
  })
})
