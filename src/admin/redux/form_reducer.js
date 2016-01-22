const { reducer: form } = require('redux-form')
const member_reducer = require('./modules/member.js')

module.exports = form.plugin(
  { member: (member, action) => member_reducer(member, action)
  }
)
