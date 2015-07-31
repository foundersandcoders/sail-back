'use strict'

var test = require('tape')
var ForgotPass = require('../../../api/services/ForgotPass.js')

test('#randomString', function (t) {
  t.plan(1)

  var randomString = ForgotPass.randomString(9)

  t.equal(randomString.length, 9, 'right length')
})

test('#hash', function (t) {
  t.plan(1)

  var hash = ForgotPass.hash('password')

  t.ok(hash, 'got an hash')

  t.end()
})
