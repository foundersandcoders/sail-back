import { combineReducers } from 'redux'

import my_details_form from './form_reducer.js'

//reducers
import payments from '../../shared/redux/modules/payments.js'
import mode from '../../shared/redux/modules/mode.js'
import active_tab from './modules/active_tab.js'
import member_reducer from '../../shared/redux/modules/member.js'
import changed_password from '../../shared/redux/modules/change_password.js'
import user_payments from './modules/user_payments.js'


const root_reducer = combineReducers(
    { payments
    , form: my_details_form
    , mode
    , active_tab
    , my_details: member_reducer
    , changed_password
    , user_payments
    }
  )

export default root_reducer
