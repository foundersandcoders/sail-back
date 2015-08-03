'use strict'

var panelViews = require('../components/signup/panels.js')
var nuclear = require('nuclear.js')
var h = nuclear.h
var utils = require('../utils.js')

module.exports = SignUp

function createMember (state, member) {

  utils.validate('member', member, function (error, value) {

    if (error) {
      return undefined
    } else {
      utils.formPost('/signup', member, 'POST')
      return undefined
    }
  })
}

function SignUp (initialState) {

  initialState = initialState || {}

  return nuclear.observS({
    member: nuclear.observS(initialState.member || {}),
    panel: nuclear.observ(initialState.panel || 'one'),
    channels: {
      createMember: createMember
    }
  })
}

SignUp.render = function (state) {

  return h('div#signup-section', [
    panelViews[state.panel()](state)
  ])
}
