const React = require('react')
const MemberFields = require('./member_fields.js')

module.exports = (
  props
) =>
  <MemberFields
    {...props}
    buttons_first={true}
  />
