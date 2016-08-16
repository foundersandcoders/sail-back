import React from 'react'
import { reduxForm } from 'redux-form'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'

export default (props) => {
  return (
    <div>
      <EditDetails {...props} />
      <div className='end-membership'>
        {props.my_details.activation_status && props.my_details.activation_status.initial_value !== 'deactivated'
          ? <EndMembershipLoader {...props} />
        : <p>Please contact us if you would like to reinstate your membership.</p>}
      </div>
    </div>
  )
}

const EndMembershipLoader = (props) => {
  return (
    <EndMembership
      {...props}
      fields={['activation_status', 'notes', 'user_notes', 'deletion_date']}
    />
  )
}

const EndMembership = reduxForm(
  { form: 'member'
  , fields: []
})(EndMembershipForm)
