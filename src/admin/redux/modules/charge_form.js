const { createAction } = require('redux-actions')

const { ADDED_PAYMENT } = require('./payments.js')
const CLOSE_CHARGE = 'CLOSE_CHARGE'
const SWITCHED_CHARGE_TYPE = 'SWITCHED_CHARGE_TYPE'

const reducer = (charge_type = '', { type, payload }) => {
  switch (type) {
    case SWITCHED_CHARGE_TYPE:
      return payload
    case ADDED_PAYMENT:
      return ''
    case CLOSE_CHARGE:
      return ''
    default:
      return charge_type
  }
}

const switch_charge_type = createAction(SWITCHED_CHARGE_TYPE)
const close_charge = createAction(CLOSE_CHARGE)

module.exports = reducer

Object.assign
  ( module.exports
  , { switch_charge_type
    , close_charge
    }
  )
