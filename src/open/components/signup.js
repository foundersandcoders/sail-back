/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')
const { identity } = require('ramda')

const MemberFields = require('../../shared/components/member_fields.js')
const { validate, sign_up_required, read_only_sign_up } = require('../../shared/form_fields/member.js')

const { next_page, previous_page } = require('../redux/modules/page.js')
const { sign_up } = require('../redux/modules/signup.js')

const SignUp = ({ page, previous_page, next_page, sign_up, form }) =>
  <div className='sign-up-container'>
    <div>
      <h2>{page === 5 ? 'If your details are correct click \'Submit\' otherwise go back to change them' : 'Please fill in your details'}</h2>
      <SignUpForm
        fields={page_fields[page]}
        Buttons={buttons}
        button_props={ { previous_page: previous_page, page: page } }
        onSubmit={page === 5 ? sign_up : next_page}
        required={sign_up_required}
        mode='edit'
        memberSignup
        read_only={page === 5 ? read_only_sign_up : []}
      />
    </div>
    {form.sign_up.duplicate_email && <h4>The email address provided already has an account. Please go back to the <a href='#'>sign in</a> page if you need to reset your password.</h4>}
  </div>

const SignUpForm = reduxForm(
  { form: 'sign_up'
  , validate: validate(sign_up_required)
  , fields: []
  }
)(MemberFields)

const buttons = (props) =>
  <div className='sign-up-buttons'>
    {props.page !== 0 && back_button(props.previous_page)}
    <button>{props.page === 5 ? 'Submit' : '>'}</button>
  </div>

const back_button = (previous_page) =>
  <button onClick={previous_page} type='button'>{'<'}</button>

const page_fields =
  [ [ 'title', 'first_name', 'last_name', 'initials' ]
  , [ 'address1', 'address2', 'address3', 'address4', 'postcode' ]
  , [ 'home_phone', 'mobile_phone' ]
  , [ 'primary_email', 'verify_email', 'password', 'verify_password' ]
  , [ 'membership_type' ]
  , read_only_sign_up
  ]

export default connect(identity, { sign_up, next_page, previous_page })(SignUp)
