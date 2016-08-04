/* @flow */
const { reducer: form } = require('redux-form')
import member_reducer from '../../shared/redux/modules/member.js'
import charge_form from './modules/charge_form.js'
import { normalise as member } from '../form_fields/member.js'

export default form.plugin(
  { member: member_reducer
  , charge_form: charge_form
  }
).normalize(
  { member
  }
)

