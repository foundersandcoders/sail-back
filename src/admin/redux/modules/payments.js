const { createAction } = require('redux-actions')
const { post, del } = require('app/http')
const { compose, flip, replace, concat, map, propOr, filter } = require('ramda')
const { standardise } = require('app/transform_dated')

const { FETCHED_MEMBER } = require('./member.js')
const ADDED_PAYMENT = 'ADDED_PAYMENT'
const REMOVED_PAYMENT = 'REMOVED_PAYMENT'

const reducer = (payments = [], { type, payload }) => {
  switch (type) {
    case FETCHED_MEMBER:
      return payload.other.payments
    case ADDED_PAYMENT:
      return concat(payments, [payload])
    case REMOVED_PAYMENT:
      return filter(({id}) => id !== payload, payments)
    default:
      return payments
  }
}

const DELETION_URL = 'api/payments/'

const make_deletion_url = concat(DELETION_URL)

const add_payment = createAction
  ( ADDED_PAYMENT
  , compose
    ( map(propOr({}, 'body'))
    , flip(post)('api/payments')
    , standardise
    )
  )

const remove_payment = createAction
  ( REMOVED_PAYMENT
  , compose
    ( map(compose(propOr('', 'id'), JSON.parse, propOr('{}', 'body')))
    , del
    , make_deletion_url
    )
  )

module.exports = Object.assign
  ( reducer
  , { add_payment
    , remove_payment
    , ADDED_PAYMENT
    }
  )

