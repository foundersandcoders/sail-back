import { combineReducers } from 'redux'

//reducers
import { routerReducer } from 'react-router-redux'
import my_details from './modules/my_details.js'
import payments from './modules/payments.js'



const root_reducer = combineReducers(
    { routing: routerReducer
    , my_details
    , payments
    }
  )

export default root_reducer
