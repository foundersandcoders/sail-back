'use strict'

var test = require('tape')
var request = require('request')
var through = require('through2')

var mockPayments = require('./mocks.js').payments
var payments = []

// make request to upload
test('create payments array', function (t) {
  var mockstream = mockPayments()
  mockstream.pipe(through.obj(function (buf, enc, next) {
    payments.push(buf)
    return next()
  }, function (cb) {
    t.equals(payments.length, 21, '21 payments in array')
    t.end()
    return cb()
  }))

})

test('POST to /upload?type=payments', function (t) {
  var opts = {
    method: 'POST',
    uri: 'http://0.0.0.0:1337/upload?type=payments',
    body: payments,
    json: true
  }

  request(opts, function (e, h, r) {
    t.equals(r.problem_count, 0, 'no problems')
    t.ok(r.done, 'upload finished')
    t.end()
  })
})

test('records should exists', function (t) {
  var opts = {
    method: 'GET',
    uri: 'http://0.0.0.0:1337/api/payments'
  }

  request(opts, function (e, h, r) {
    var payments = JSON.parse(r)
    t.ok(payments.length > 4, 'records created')
    t.end()
  })
})
