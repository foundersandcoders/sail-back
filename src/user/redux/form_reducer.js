/* @flow */
const { reducer: form } = require('redux-form')
import  my_details_reducer from './modules/my_details.js'
//import { normalise as member } from '../form_fields/member.js'

export default form.plugin(
  { user: my_details_reducer
  }
)
//
