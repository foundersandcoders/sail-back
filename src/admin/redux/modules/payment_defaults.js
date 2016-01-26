const UPDATE_FIELD = 'UPDATE_FIELD'
const { createAction } = require('redux-actions')
const { FETCHED_MEMBER } = require('./member.js')

const initial_state =
  { date: ''
  , reference: ''
  , payment_type: ''
  , subscription_amount: ''
  }

function payment_defaults (state = initial_state, {type, payload}) {
  switch (type) {
    case FETCHED_MEMBER:
      return {...state, subscription_amount: payload.other.subscription_amount }
    case UPDATE_FIELD:
      return action.payload.field.match(/^date|reference|type$/)
        ? { ...state, [payload.field]: payload.value }
        : state
    default:
      return state
  }
}

exports = module.exports = payment_defaults

exports.update_field = createAction(UPDATE_FIELD)

module.exports = payment_defaults
