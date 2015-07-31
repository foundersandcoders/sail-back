'use strict'

var test = require('tape')
var Utils = require('../../../api/services/Utils.js')

test('#factoryActivationCodes', function (t) {
  t.plan(1)

  var activationObj = Utils.factoryActivationCodes('123456')

  t.equal(activationObj.member, '123456', 'member attributes')
})

test('#checkExpiration', function (t) {
  t.plan(2)

  var tomorrow = new Date()
  tomorrow.setMonth(tomorrow.getMonth() + 1)
  var yesterday = new Date()
  yesterday.setMonth(yesterday.getMonth() - 1)

  var stillTime = Utils.checkExpiration(tomorrow)
  var tooLate = Utils.checkExpiration(yesterday)

  t.ok(stillTime, 'still time')
  t.notOk(tooLate, 'too late')
})
