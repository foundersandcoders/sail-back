'use strict'

const action_types = require('../actions/types.js')

const initial_state =
  { date: ''
  , reference: ''
  , type: ''
  }

function payment_defaults (state = initial_state, action) {
  switch (action.type) {
    case action_types.UPDATE_FIELD:
      return action.payload.field.match(/^date|reference|type$/)
        ? { ...state, [action.payload.field]: action.payload.value }
        : state
    default:
      return state
  }
}

module.exports = payment_defaults
