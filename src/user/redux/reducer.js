import { combineReducers } from 'react-redux'

import { routerReducer } from 'react-router-redux'
import account_details from './modules/account_details.js'
import payments from './modules/payments.js'

export default combineReducers(
  { account_details
  , payments
  }
)
