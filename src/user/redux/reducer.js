import { combineReducers } from 'redux'

//reducers
import my_details from './modules/my_details.js'
import payments from './modules/payments.js'



const root_reducer = combineReducers(
    { my_details
    , payments
    }
  )

export default root_reducer
