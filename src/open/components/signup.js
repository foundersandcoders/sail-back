/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { reduxForm } = require('redux-form')

const MemberFields = require('../../shared/components/member_fields.js')
const { validate, new_required, read_only } = require('../../shared/form_fields/member.js')
// const fields = [ 'primary_email', 'first_name', 'membership_type', 'password']

const { identity } = require('ramda')

const { sign_up, update_form } = require('../redux/modules/signup.js')
// const { update_form } = require('../redux/modules/page.js')

const buttons = () =>
  <button>Click Me</button>

const AddMember = reduxForm(
  { form: 'sign_up'
  , validate
  , fields: []
  }
)(MemberFields)

const NewMember = (props) => {
  console.log('args', props)
  return (
    <div>
      <div className='new-member-container'>
        <h1>Add New Member</h1>
        <AddMember
          fields={props.page.fields[props.page.page]}
          Buttons={buttons}
          onSubmit={props.sign_up}
          required={new_required}
          mode='edit'
          read_only={read_only}
          className='add-member-form-container'
          addMember
        />
      </div>
      <button onClick={() => props.update_form(1)}>Next</button>
      <button onClick={() => props.update_form(0)}>Back</button>
    </div>
)
}

export default connect(identity, { sign_up, update_form })(NewMember)
