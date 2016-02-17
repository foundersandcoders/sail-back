const React = require('react')
const { reduxForm } = require('redux-form')
const { validate, required } = require('../form_fields/member.js')
const MemberFields = require('./member_fields.js')

module.exports = (
  props
) =>
  <ViewMember
    {...props}
    required={required}
    buttons_first={true}
  />

const ViewMember = reduxForm(
  { form: 'member'
  , validate
  , fields: []
  }
)(MemberFields)
