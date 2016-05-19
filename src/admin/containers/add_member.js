/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')
const { pick } = require('ramda')

const MemberFields = require('../dumb_components/member_fields.js')
const { fields, validate, required } = require('../form_fields/member.js')
const { create_member } = require('../redux/modules/member.js')
const { send_welcome } = require('../redux/modules/email.js')

const buttons = (
  { fields: { id, primary_email }, error, email_handler, email_sent }
) =>
  <div>
    { error ? <div className='error'>{error.message}</div> : '' }
    { id.value && !email_sent
      ? <div>
          { letter_or_email(email_handler, primary_email.value, id.value) }
          <div id='member-num'>Member ID is: {id.value} </div>
        </div>
      : email_sent || <button type='submit'>Submit</button>
    }
  </div>

const letter_or_email = (email_handler, email, id) =>
  email
  ? <button onClick={() => email_handler(email)} type="button">
      Send Welcome Email
    </button>
  : <a href={'#/letter/' + id}>
      Print Welcome Letter
    </a>

const AddMember = reduxForm(
  { form: 'member'
  , validate
  , fields: []
  }
)(MemberFields)

const NewMember = (
  { create_member
  , send_welcome
  , email
  }
) => (
  <div>
    <div className='new-member-container'>
      <h1>New Member Form</h1>
      <AddMember
        fields={fields}
        Buttons={buttons}
        button_props={
          { email_handler: email_handler(send_welcome)
          , email_sent: email.email_sent
          }
        }
        onSubmit={create_member}
        required={required}
        mode='edit'
      />
      <a href='#/' className='flex-button'>
        <button className='button-primary'>Home</button>
      </a>
    </div>
  </div>
)

const email_handler = send_welcome => email => {
  send_welcome(email)
}

const map_state_to_props = pick(['email'])
const map_dispatch_to_props = (
  { create_member
  , send_welcome
  }
)

export default connect(map_state_to_props, map_dispatch_to_props)(NewMember)
