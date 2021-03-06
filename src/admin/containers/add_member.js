/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')
const { pick } = require('ramda')

const MemberFields = require('../../shared/components/member_fields.js')
const { fields, validate, add_member_required, read_only } = require('../../shared/form_fields/member.js')
const { create_member } = require('../../shared/redux/modules/member.js')
const { send_welcome } = require('../redux/modules/email/reducer.js')

const buttons = ({ fields: { id, primary_email }, error, email_handler, email_sent, sending_error }) =>
  <div className='add-member-buttons'>
    { error ? <div className='error'>{error.message}</div> : '' }
    { id.value && !email_sent
      ? <div>
        <div className='member-num'>Member ID is: {id.value} </div>
        {letter_or_email(email_handler, primary_email.value, id.value, sending_error)}
      </div>
      : email_sent || <button type='submit'>Add Member</button>
    }
    { email_sent && <h2 className='email-sent'>The email has been sent.</h2> }
    { sending_error && <h2 className='sending-error'>There was a problem sending the email.</h2> }
  </div>

const letter_or_email = (email_handler, email, id, sending_error) =>
  email
  ? (sending_error || <div><button onClick={() => email_handler({ email, id })} type='button'>Send Welcome Email</button></div>)
  : print_letter_link(id)

const print_letter_link = (id) =>
  <div>
    <a href={'#/letter/' + id}>
      Print Welcome Letter
    </a>
  </div>


const AddMember = reduxForm(
  { form: 'member'
  , validate: validate(add_member_required)
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
      <h1>Add New Member</h1>
      <AddMember
        fields={fields}
        Buttons={buttons}
        button_props={
          { email_handler: email_handler(send_welcome)
          , email_sent: email.email_sent
          , sending_error: email.sending_error
          }
        }
        onSubmit={create_member}
        required={add_member_required}
        mode='edit'
        read_only={read_only}
        className='add-member-form-container'
        addMember
      />
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
