import React from 'react'
import { reduxForm } from 'redux-form'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'

export default (props) => {
  return (
    <div>
      <div className='end-membership'>
        {props.my_details.activation_status && props.my_details.activation_status.initial_value !== 'deactivated'
          ? <EndMembershipLoader {...props} />
          : <p>Please contact us if you would like to reinstate your membership.</p>}
      </div>
      <EditDetails {...props} />
    </div>
  )
}

const EndMembershipLoader = (props) => {
  return (
    <EndMembership
      {...props}
      fields={['activation_status', 'deletion_reason', 'notes', 'deletion_date']}
    />
  )
}

const EndMembership = reduxForm(
  { form: 'user'
  , fields: []
})(EndMembershipForm)
