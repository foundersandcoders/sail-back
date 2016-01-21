const { reducer: form } = require('redux-form')
const member = require('./modules/member.js')

module.exports = form.plugin(
  { personal: ({ personal }, action) => ({ personal: member(personal, action) })
  }
)
