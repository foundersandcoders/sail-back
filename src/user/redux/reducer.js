import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

//reducers
import my_details from './modules/my_details.js'
import payments from './modules/payments.js'

const root_reducer = combineReducers(
    { my_details
    , payments
    , form: formReducer
    }
  )

export default root_reducer
