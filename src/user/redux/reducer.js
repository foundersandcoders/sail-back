import { combineReducers } from 'redux'

import personal_details_form from './form_reducer.js'

//reducers
import payments from '../../shared/redux/modules/payments.js'
import mode from '../../shared/redux/modules/mode.js'
import member_reducer from '../../shared/redux/modules/member.js'
import changed_password from '../../shared/redux/modules/change_password.js'
import user_payments from './modules/user_payments.js'


const root_reducer = combineReducers(
    { payments
    , form: personal_details_form
    , mode
    , personal_details: member_reducer
    , changed_password
    , user_payments
    }
  )

export default root_reducer
