import React from 'react'
import { reduxForm } from 'redux-form'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'

export default (props) => {
  return (
    <div>
      <div className='end-membership'>
        {props.my_details.activation_status && props.my_details.activation_status.initial_value === 'activated'
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
      fields={['activation_status', 'deletion_reason', 'notes']}
      initialValues={{activation_status: props.my_details.activation_status.initial_value}}
    />
  )
}

const EndMembership = reduxForm(
  { form: 'user'
  , fields: []
})(EndMembershipForm)
