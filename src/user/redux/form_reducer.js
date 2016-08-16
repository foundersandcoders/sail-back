/* @flow */
const { reducer: form } = require('redux-form')
import member_reducer from '../../shared/redux/modules/member.js'
import { normalise as member } from '../../shared/form_fields/member.js'

export default form.plugin(
  { member: member_reducer
  }
).normalize(
  { member
  }
)
