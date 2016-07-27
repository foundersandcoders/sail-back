import { combineReducers } from 'redux'

//reducers
import { routerReducer } from 'react-router-redux'
import account_details from './modules/account_details.js'
import payments from './modules/payments.js'



const root_reducer = combineReducers(
    { routing: routerReducer
    , account_details
    , payments
    }
  )

export default root_reducer
