const { createAction } = require('redux-actions')

const { FETCHED_MEMBER } = require('./member.js')
const { ADDED_PAYMENT } = require('./payments.js')
const { format } = require('app/transform_dated.js')
const { reduce, keys, compose } = require('ramda')

const initial_state =
  { date: ''
  , reference: ''
  , category: ''
  , amount: ''
  }

function payment_defaults (state = initial_state, {type, payload}) {
  switch (type) {
    case FETCHED_MEMBER:
      return {...state, amount: String(payload.other.subscription_amount) }
    case ADDED_PAYMENT:
      return compose
        ( format
        , reduce
          ( (state, field) =>
              field.match(/^date|reference|type$/)
              ? { ...state, [field]: payload[field] }
              : state
          , state
          )
        , keys
        )(payload)
    default:
      return state
  }
}

exports = module.exports = payment_defaults

module.exports = payment_defaults
