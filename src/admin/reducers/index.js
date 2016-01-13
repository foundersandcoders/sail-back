'use strict'

var { combineReducers } = require('redux')
var { reducer: form } = require('redux-form')
var payment_defaults = require('./payment_defaults.js')
var member = require('./member.js')

const admin_app = combineReducers({
  payment_defaults
  , form
  , member
})

module.exports = admin_app