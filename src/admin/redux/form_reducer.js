const { reducer: form } = require('redux-form')
const member_reducer = require('./modules/member.js')
const charge_form = require('./modules/charge_form.js')

module.exports = form.plugin(
  { member: member_reducer
  , charge_form: charge_form
  }
)
