const { createAction } = require('redux-actions')
const { post } = require('app/http')
const { compose, flip } = require('ramda')
const { standardise } = require('app/transform_dated')

const { FETCHED_MEMBER } = require('./member.js')
const ADDED_PAYMENT = 'ADDED_PAYMENT'

const reducer = (payments = [], { type, payload }) => {
  switch (type) {
    case FETCHED_MEMBER:
      return payload.other.payments
    case ADDED_PAYMENT:
      return payments
    default:
      return payments
  }
}

const add_payment = createAction
  ( ADDED_PAYMENT
  , compose
    ( flip(post)('api/payments')
    , standardise
    )
  )

module.exports = Object.assign
  ( reducer
  , { add_payment
    }
  )

