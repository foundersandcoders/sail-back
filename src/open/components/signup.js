/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')

const MemberFields = require('../../shared/components/member_fields.js')
const { validate } = require('../../shared/form_fields/member.js')

const { identity } = require('ramda')

const { next_page, previous_page } = require('../redux/modules/page.js')
const { sign_up } = require('../redux/modules/signup.js')

const required =
  [ 'title'
  , 'last_name'
  , 'first_name'
  , 'address1'
  , 'address2'
  , 'postcode'
  , 'password'
  , 'membership_type'
  , 'news_type'
  ]

const buttons = (props) =>
  <div>
    <button>Next</button>
    <button onClick={props.previous_page} type='button'>Back</button>
  </div>

const AddMember = reduxForm(
  { form: 'sign_up'
  , validate: validate(required)
  , fields: []
  }
)(MemberFields)

const NewMember = (props) => {
  return (
    <div>
      <div>
        <h1>Add New Member</h1>
        <AddMember
          fields={props.page.fields[props.page.page]}
          Buttons={buttons}
          button_props={ { previous_page: props.previous_page } }
          onSubmit={props.page.page === 5 ? props.sign_up : props.next_page}
          required={required}
          mode='edit'
          memberSignup
          read_only={props.page.page !== 5 ? [] : [ 'title', 'first_name', 'last_name', 'initials', 'address1', 'address2', 'address3', 'address4', 'postcode', 'home_phone', 'mobile_phone', 'primary_email', 'password', 'membership_type' ]}
        />
      </div>
    </div>
  )
}

export default connect(identity, { sign_up, next_page, previous_page })(NewMember)
