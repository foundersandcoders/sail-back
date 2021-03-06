/* @flow */
const { createAction } = require('redux-actions')
const { post, del } = require('app/http')
const { compose, flip, concat, map, propOr, filter, sortBy } =
  require('ramda')
const { standardise } = require('app/transform_dated')

const { FETCHED_MEMBER } = require('../../../shared/redux/modules/member.js')
const { PATH_UPDATE } = require('./route.js')
export const ADDED_PAYMENT = 'ADDED_PAYMENT'
const REMOVED_PAYMENT = 'REMOVED_PAYMENT'

import type { Payment } from '../../../admin/redux/modules/payment_defaults'
import type { Action, Reducer } from 'redux'

const reducer: Reducer<Payment[], Action>
  = (payments = [], { type, payload }) => {
    switch (type) {
      case FETCHED_MEMBER:
        return sort_dated(payload.payments)
      case ADDED_PAYMENT:
        return sort_dated(concat(payments, [payload]))
      case REMOVED_PAYMENT:
        return filter(({id}) => id !== payload, payments)
      case PATH_UPDATE:
        return []
      default:
        return payments
    }
  }

export default reducer

const DELETION_URL = 'api/payments/'

const make_deletion_url = concat(DELETION_URL)

const sort_dated = sortBy(compose
  ( (date) => new Date(date).getTime()
  , propOr(new Date(), 'date')
  )
)

export const add_payment = createAction
  ( ADDED_PAYMENT
  , compose
    ( map(propOr({}, 'body'))
    , flip(post)('api/payments')
    , standardise
    )
  )

export const remove_payment = createAction
  ( REMOVED_PAYMENT
  , compose
    ( map(compose(propOr('', 'id'), JSON.parse, propOr('{}', 'body')))
    , del
    , make_deletion_url
    )
  )
