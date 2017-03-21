/* global
   Members, BookingRecords
*/

'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails
var Cookies
var MEMBER

test('"Payments" connection: ', function (t) {
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

test('Sign up and get cookies', function (t) {
  var memberMock = {
    primary_email: 'payment@email.com',
    membership_type: 'annual-corporate',
    password: 'secret'
  }

  request(sails.hooks.http.app)
    .post('/signup')
    .send(memberMock)
    .end(function (err, res) {
      Cookies = res.headers['set-cookie'].pop().split(';')[0]

      Members
        .findOne({primary_email: memberMock.primary_email})
        .exec(function (error, item) {
          MEMBER = item

          t.notOk(error, 'no error')
          t.ok(item, 'got member')
          t.end()
        })
    })
})

test('Get account info with cookies', function (t) {
  var req = request(sails.hooks.http.app).get('/api/account')

  // console.log('NEW MEMBER', Cookies)

  req.cookies = Cookies

  req.end(function (err, res) {
    t.equal(res.statusCode, 200, 'got access')
    t.equal(res.body.primary_email, 'payment@email.com', 'got account info')
    t.end()
  })
})

test('Close to request without a valid session', function (t) {
  var req = request(sails.hooks.http.app).get('/api/account')

  req.end(function (err, res) {
    t.equal(res.statusCode, 404, 'got 404')
    t.end()
  })
})

test('Make a payment', function (t) {
  var token
  t.test('get client token', function (st) {
    var req = request(sails.hooks.http.app).get('/client_token')
    req.cookies = Cookies
    req.end(function (err, res) {
      t.equal(res.statusCode, 200, 'status ok')
      t.ok(res.body.token, 'got token')

      token = res.body.token

      st.end()
    })
  })
  // TODO:  check if amount is string or number, and whether it is sent in pounds or pennies
  t.test('make payment', function (st) {
    var fakePayment = {
      amount: '20',
      nonce: 'fake-valid-nonce',
      category: 'payment',
      reference: '11',
      member: MEMBER.id,
      type: 'credit card'
    }

    var req = request(sails.hooks.http.app).post('/make_payment')
    req.cookies = Cookies

    req
      .send(fakePayment)
      .end(function (error, res) {
        st.equal(res.statusCode, 200, 'status code 200')

        Members
          .findOne({primary_email: 'payment@email.com'})
          .populateAll()
          .exec(function (err, item) {
            console.log('User populated: ', item)

            var lastPayment = item.payments[item.payments.length - 1]
            st.equal(lastPayment.category, 'payment', 'right category')
            st.equal(lastPayment.type, 'credit card', 'payment is stored as type credit card')
            st.equal((lastPayment.amount / 100), parseInt(fakePayment.amount), 'right amount')
            st.end()
          })
      })
  })
})

test('Invalid payment details', function (t) {
  // amount of 5001 will result in a transaction error
  // https://developers.braintreepayments.com/reference/general/testing/node#test-amounts
  t.test('Attempt to make payment with invalid amount', function (st) {
    var fakeInvalidPayment = {
      amount: '5001',
      nonce: 'fake-valid-nonce',
      category: 'payment',
      reference: '13',
      member: MEMBER.id,
      type: 'credit card'
    }

    var req = request(sails.hooks.http.app).post('/make_payment')
    req.cookies = Cookies

    req
      .send(fakeInvalidPayment)
      .end(function (error, res) {
        st.equal(res.statusCode, 200, 'status code 200')
        st.ok(!res.body.success, 'payment failed')

        Members
          .findOne({primary_email: 'payment@email.com'})
          .populateAll()
          .exec(function (err, item) {
            var lastPayment = item.payments[item.payments.length - 1]
            st.ok((lastPayment.amount / 100) !== parseInt(fakeInvalidPayment.amount), 'no payment was added to Db')
            st.end()
          })
      })
  })
})

test('make payment', function (t) {
  t.test('Successful paypal payment', function (st) {
    var fakePaypalPayment = {
      amount: '29',
      nonce: 'fake-valid-nonce',
      category: 'payment',
      reference: '14',
      member: MEMBER.id,
      type: 'paypal'
    }

    var req = request(sails.hooks.http.app).post('/make_payment')
    req.cookies = Cookies

    req
      .send(fakePaypalPayment)
      .end(function (error, res) {
        st.equal(res.statusCode, 200, 'status code 200')
        st.ok(res.body.success, 'payment was successful')

        Members
          .findOne({primary_email: 'payment@email.com'})
          .populateAll()
          .exec(function (err, item) {
            var lastPayment = item.payments[item.payments.length - 1]
            st.equal((lastPayment.amount / 100), parseInt(fakePaypalPayment.amount), 'payment was added to Db')
            st.equal(lastPayment.type, 'paypal', 'payment is stored as type paypal')
            st.end()
          })
      })
  })
})
