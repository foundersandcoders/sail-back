/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')

const MemberFields = require('../../shared/components/member_fields.js')
const { validate, sign_up_required, read_only_sign_up } = require('../../shared/form_fields/member.js')

const { identity } = require('ramda')

const { next_page, previous_page } = require('../redux/modules/page.js')
const { sign_up } = require('../redux/modules/signup.js')

const buttons = (props) =>
  <div>
    <button>Next</button>
    <button onClick={props.previous_page} type='button'>Back</button>
  </div>

const AddMember = reduxForm(
  { form: 'sign_up'
  , validate: validate(sign_up_required)
  , fields: []
  }
)(MemberFields)

const NewMember = (props) => {
  return (
    <div>
      <div>
        <h1>Please fill in your details</h1>
        <AddMember
          fields={page_fields[props.page]}
          Buttons={buttons}
          button_props={ { previous_page: props.previous_page } }
          onSubmit={props.page.page === 5 ? props.sign_up : props.next_page}
          required={sign_up_required}
          mode='edit'
          memberSignup
          read_only={props.page === 5 ? read_only_sign_up : []}
        />
      </div>
    </div>
  )
}

const page_fields = [
  [ 'title', 'first_name', 'last_name', 'initials' ],
  [ 'address1', 'address2', 'address3', 'address4', 'postcode' ],
  [ 'home_phone', 'mobile_phone' ],
  [ 'primary_email', 'password' ],
  [ 'membership_type' ],
  [ 'title', 'first_name', 'last_name', 'initials', 'address1', 'address2', 'address3', 'address4', 'postcode', 'home_phone', 'mobile_phone', 'primary_email', 'membership_type' ]
]
export default connect(identity, { sign_up, next_page, previous_page })(NewMember)
