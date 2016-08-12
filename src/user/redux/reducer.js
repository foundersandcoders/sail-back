import { combineReducers } from 'redux'

import my_details_form from './form_reducer.js'

//reducers
import payments from '../../shared/redux/modules/payments.js'
import mode from '../../shared/redux/modules/mode.js'
import active_tab from './modules/active_tab.js'


const root_reducer = combineReducers(
    { payments
    , form: my_details_form
    , mode
    , active_tab
    }
  )

export default root_reducer
