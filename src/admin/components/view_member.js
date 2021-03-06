const React = require('react')
const { reduxForm } = require('redux-form')
const { validate, required, read_only } = require('../../shared/form_fields/member.js')
const MemberFields = require('../../shared/components/member_fields.js')

module.exports = (
  props
) =>
  <ViewMember
    {...props}
    required={required}
    buttons_first
    read_only={read_only}
  />

const ViewMember = reduxForm(
  { form: 'member'
  , validate: validate(required)
  , fields: []
  }
)(MemberFields)
