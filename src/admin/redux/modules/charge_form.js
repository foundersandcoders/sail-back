const { createAction } = require('redux-actions')

const SWITCHED_CHARGE_TYPE = 'SWITCHED_CHARGE_TYPE'

const reducer = (charge_type = '', { type, payload }) => {
  switch (type) {
    case SWITCHED_CHARGE_TYPE:
      return payload
    default:
      return charge_type
  }
}

const switch_charge_type = createAction(SWITCHED_CHARGE_TYPE)

module.exports = reducer

Object.assign
  ( module.exports
  , { switch_charge_type
    }
  )
