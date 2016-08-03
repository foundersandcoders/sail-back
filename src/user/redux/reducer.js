import { combineReducers } from 'redux'

import my_details_form from './form_reducer.js'

//reducers
import my_details from './modules/my_details.js'
import payments from './modules/payments.js'

//TODO split mydetails reducer functionality

const root_reducer = combineReducers(
    { my_details
    , payments
    , form: my_details_form
    }
  )

export default root_reducer
