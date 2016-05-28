/* @flow */
const { createAction } = require('redux-actions')

const { ADDED_PAYMENT } = require('./payments.js')
const { PATH_UPDATE } = require('./route.js')
const SWITCHED_CHARGE_TYPE = 'SWITCHED_CHARGE_TYPE'

import type { Action, Reducer } from 'redux'

const reducer : Reducer<string, Action>
  = (charge_type = '', { type, payload }) => {
    switch (type) {
      case SWITCHED_CHARGE_TYPE:
        return payload
      case ADDED_PAYMENT:
        return ''
      case PATH_UPDATE:
        return ''
      default:
        return charge_type
    }
  }

export const switch_charge_type = createAction(SWITCHED_CHARGE_TYPE)

export default reducer

