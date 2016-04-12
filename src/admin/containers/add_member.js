const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')

const MemberFields = require('../dumb_components/member_fields.js')
const { fields, validate, required } = require('../form_fields/member.js')
const { create_member } = require('../redux/modules/member.js')
const { send_welcome } = require('../redux/modules/email.js')

const buttons = (
  { fields: { id, primary_email }, error, email_handler }
) =>
  <div>
    { error ? <div className='error'>{error}</div> : '' }
    { id.value
      ? <div>
          { letter_or_email(email_handler, primary_email.value, id.value) }
          <div id='member-num'>Member ID is: {id.value} </div>
        </div>
      : <button type='submit'>Submit</button>
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
  }
) => (
  <div>
    <div className='new-member-container'>
      <h1>New Member Form</h1>
      <AddMember
        fields={fields}
        Buttons={buttons}
        button_props={ { email_handler: send_welcome } }
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

const map_state_to_props = () => ({})
const map_dispatch_to_props = (
  { create_member
  , send_welcome
  }
)

module.exports = connect(map_state_to_props, map_dispatch_to_props)(NewMember)
