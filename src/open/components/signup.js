/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')

const MemberFields = require('../../shared/components/member_fields.js')
const { validate, new_required, read_only } = require('../../shared/form_fields/member.js')
// const fields = [ 'primary_email', 'first_name', 'membership_type', 'password']

const { identity } = require('ramda')

const { next_page, previous_page } = require('../redux/modules/page.js')
const { sign_up } = require('../redux/modules/signup.js')
// const { next_page } = require('../redux/modules/page.js')

const required =
  [ 'title'
  , 'last_name'
  , 'first_name'
  , 'address1'
  , 'postcode'
  , 'membership_type'
  , 'news_type'
  ]

const buttons = () =>
  <button>Click Me</button>

const AddMember = reduxForm(
  { form: 'sign_up'
  , validate
  , fields: []
  }
)(MemberFields)

const NewMember = (props) => {
  console.log(props)
  return (
    <div>
      <div>
        <h1>Add New Member</h1>
        <AddMember
          fields={props.page.fields[props.page.page]}
          Buttons={buttons}
          onSubmit={props.sign_up}
          required={required}
          mode='edit'
          memberSignup
          read_only={props.page.page !== 5 ? [] : [ 'title', 'first_name', 'last_name', 'initials', 'address1', 'address2', 'address3', 'address4', 'postcode', 'home_phone', 'mobile_phone', 'primary_email', 'password', 'membership_type' ]}
        />
      </div>
      <button onClick={props.next_page}>Next</button>
      <button onClick={props.previous_page}>Back</button>
    </div>
)
}

export default connect(identity, { sign_up, next_page, previous_page })(NewMember)
