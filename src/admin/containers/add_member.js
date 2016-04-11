'use strict'

const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')
const { post } = require('app/http')

const MemberFields = require('../dumb_components/member_fields.js')
const { fields, validate, required } = require('../form_fields/member.js')
const { create_member } = require('../redux/modules/member.js')

const buttons = (
  { fields: { id: { value: id }, primary_email: { value: primary } }, error }
) =>
  <div>
    { error ? <div className='error'>{error}</div> : '' }
    { id
      ? <div>
          { letter_or_email(primary, id) }
          <div id='member-num'>Member ID is: {id} </div>
        </div>
      : <button type='submit'>Submit</button>
    }
  </div>

const letter_or_email = (primary_email, id) =>
  primary_email
  ? <a onClick={sendEmail(primary_email)} href='#/'>
      Send Welcome Email
    </a>
  : <a href={'#/email/' + id}>
      Print Welcome Letter
    </a>

const sendEmail = primary_email =>
  () => post({ email: primary_email}, '/api/members/welcome').fork(console.log.bind(console), console.log.bind(console))

const AddMember = reduxForm(
  { form: 'member'
  , validate
  , fields: []
  }
)(MemberFields)

const NewMember = (
  { create_member
  }
) => (
  <div>
    <div className='new-member-container'>
      <h1>New Member Form</h1>
      <AddMember
        fields={fields}
        Buttons={buttons}
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
  }
)

module.exports = connect(map_state_to_props, map_dispatch_to_props)(NewMember)
